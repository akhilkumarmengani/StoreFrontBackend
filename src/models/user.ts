import Client from '../database';
import { ProductStore } from './product';
import bcrypt from 'bcrypt'
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

type UserRequest = { firstName: string, lastName : string, password : string };

const saltRounds : string = process.env.SALT_ROUNDS as string;
const pepper : string = process.env.BCRYPT_PASSWORD as string;

export type User = {
    id? : number,
    firstName : string,
    lastName : string,
    password : string 
};
const generateAuthToken = (id: string): string => {
    return jwt.sign(id, process.env.TOKEN_SECRET as string);
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

    async create(user : User ): Promise<string>{
        const sql = 'INSERT INTO users(firstName,lastName,password) VALUES($1,$2,$3) RETURNING *';
        try{
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds)
              );
            const result : QueryResult = await conn.query(sql,[user.firstName,user.lastName,hash]);
            const newUser = result.rows[0];
            console.log("User - " + newUser);
            conn.release();
            
            const userId : number = result.rows[0].id;
            const authToken : string = generateAuthToken(userId.toString());

            return authToken;
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

    async authenticate(userId: number, password: string): Promise<User | null> {

        try {
            const conn = await Client.connect()
            const sql = 'SELECT password FROM users WHERE id = ($1)'

            const result = await conn.query(sql, [userId])
        
            console.log(password+pepper)
        
            if(result.rows.length > 0) {
        
                const user : User = result.rows[0]
        
                console.log('User Found : ' + user)
            
                if (bcrypt.compareSync(password+pepper, user.password)) {
                    console.log('return user');
                    return user
                }
            }
        }
        catch (err){
            throw new Error(`Authenticate Error: ${err}`)
        }
        
        console.log('null user')
        return null
    }

    
}
