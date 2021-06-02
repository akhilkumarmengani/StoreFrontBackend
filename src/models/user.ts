import Client from '../database';
import { ProductStore } from './product';

type UserRequest = { firstName: string, lastName : string, password : string };

export type User = {
    id : number,
    firstName : string,
    lastName : string,
    password : string 
};

export class UserStore{
    async index():Promise<User[]>{
        const sql = 'SELECT * FROM users';
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const result =  await conn.query(sql);
            console.log(result.rowCount)
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error('SHOW Error - '+ err);
        }
        
    }

    async create(user : UserRequest ): Promise<User>{
        const sql = 'INSERT INTO users(firstName,lastName,password) VALUES($1,$2,$3) RETURNING *';
        try{
            const conn = await Client.connect();
            const result = await conn.query(sql,[user.firstName,user.lastName,user.password]);
            const newUser = result.rows[0];
            console.log("User - " + newUser);
            conn.release();
            return newUser;
        }
        catch(err){
            throw new Error('CREATE Error - '+ err);
        }
    } 

    async show(id: number): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
}
