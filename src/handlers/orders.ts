import express from 'express';
import {Order, OrderStore} from '../models/order';
import verifyAuthToken from '../middleware/authentication'
import { appendFile } from 'fs/promises';

type OrderRequest = {productId : number , quantity : number , userId : number, status : string }


const store = new OrderStore();

const index = async (req : express.Request ,res : express.Response) => {
    const orders = await store.index();
    res.send(orders);
};

const create = async (req : express.Request ,res : express.Response) => {
    const order : OrderRequest = {
        productId : parseInt(req.body.productId as string),
        quantity : parseInt(req.body.quantity as string),
        userId : parseInt(req.body.userId as string),
        status : req.body.status as string,
    } ;
    console.log(order);
    const newOrder : Order = await store.create(order);
    res.send(newOrder);
};

const show = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.id as string);
    const order = await store.show(id);
    res.send(order);

}

const update = async (req : express.Request ,res : express.Response) =>{
    const order : OrderRequest = {
        productId : parseInt(req.body.productId as string),
        quantity : parseInt(req.body.quantity as string),
        userId : parseInt(req.body.userId as string),
        status : req.body.status as string,
    } ;
    const updateOrder = await store.update(order);
    res.send(updateOrder);

}

const currentOrders = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.user_id as string);
    const user = await store.currentOrders(id);
    res.send(user);

}

const completedOrders = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.user_id as string);
    const user = await store.completedOrders(id);
    res.send(user);

}


const order_routes = ( app : express.Application) => {
    console.log('In order routes...');
    app.get('/orders',verifyAuthToken,index);
    app.post('/orders',verifyAuthToken,create);
    app.get('/orders/:id',verifyAuthToken,show);
    app.put('/orders',verifyAuthToken,update);
    app.get('/users/:user_id/current-orders',verifyAuthToken,currentOrders);
    app.get('/users/:user_id/current-orders',verifyAuthToken,completedOrders);
}

export default order_routes;



