import Client from '../database';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const saltRounds: string = process.env.SALT_ROUNDS as string;
// const pepper: string = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};
const generateAuthToken = (id: string): string => {
  return jwt.sign(id, process.env.TOKEN_SECRET as string);
};

export class UserStore {
  async index(): Promise<User[]> {
    const sql = 'SELECT * FROM users';
    try {
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('SHOW Error - ' + err);
    }
  }

  async create(user: User): Promise<string> {
    const sql =
      'INSERT INTO users(firstName,lastName,password) VALUES($1,$2,$3) RETURNING *';
    try {
      const conn = await Client.connect();
      // const hash = bcrypt.hashSync(
      //   user.password + pepper,
      //   parseInt(saltRounds)
      // );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.password
      ]);
      conn.release();

      const userId: number = result.rows[0].id;
      const authToken: string = generateAuthToken(userId.toString());
      return authToken;
    } catch (err) {
      throw new Error('CREATE Error - ' + err);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE users WHERE id=($1) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(userId: number, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE id = ($1)';

      const result = await conn.query(sql, [userId]);

      if (result.rows.length > 0) {
        const user: User = result.rows[0];

        //if (bcrypt.compareSync(password + pepper, user.password)) {
        if (user.password === password) {
          return user;
        }
      }
    } catch (err) {
      throw new Error(`Authenticate Error: ${err}`);
    }

    return null;
  }
}
