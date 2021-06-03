import Client from '../database';
import {Product, ProductStore} from './product'
import {User, UserStore} from './user'

type OrderRequest = {productId : number , quantity : number , userId : number, status : string}

export type Order = {
    id? : number,
    productId : number,
    quantity : number,
    userId : number,
    status : string
};

export class OrderStore{
    async index():Promise<Order[]>{
        const sql = 'SELECT * FROM orders';
        try{
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error('SHOW Error - '+ err);
        }
        
    }

    async create(order : OrderRequest): Promise<Order>{
        const sql = 'INSERT INTO orders(product_id,quantity,user_id,status) VALUES($1,$2,$3,$4) RETURNING *';
        try{
            const conn = await Client.connect();
            const result = await conn.query(sql,[order.productId , order.quantity, order.userId , order.status]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error('CREATE Error - '+ err);
        }
    } 

    async show(userId: number): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE user_id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [userId])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders for user id ${userId}. Error: ${err}`)
        }
    }

    async update( order : OrderRequest): Promise<Order> {
        try {
        const sql = 'UPDATE orders SET quantity = ($3), status = ($4) WHERE user_id=($1) and product_id = $(2)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [order.userId,order.productId,order.quantity,order.status])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders for user id ${order.userId}. Error: ${err}`)
        }
    }


    async currentOrders(userId : number) : Promise<Order[]>{
        try {
            const status = 'ACTIVE';
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and status = ($2) '
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn.query(sql, [userId,status])
        
            conn.release()
        
            return result.rows
            } catch (err) {
                throw new Error(`Could not find orders for user id ${userId}. Error: ${err}`)
            }
    }

    async completedOrders(userId : number) : Promise<Order[]>{
        try {
            const status = 'COMPLETE';
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and status = ($2) '
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn.query(sql, [userId,status])
        
            conn.release()
        
            return result.rows
            } catch (err) {
                throw new Error(`Could not find orders for user id ${userId}. Error: ${err}`)
            }
    }

    



}