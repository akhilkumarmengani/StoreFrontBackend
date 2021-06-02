import express from 'express';
import {Product, ProductStore} from '../models/product';
import verifyAuthToken from '../middleware/authentication';

type ProductRequest = { name: string, price : number , category : string };

const store = new ProductStore();

const index = async (req : express.Request ,res : express.Response) => {
    const users = await store.index();
    res.send(users);
};

const create = async (req : express.Request ,res : express.Response) => {
    const product : ProductRequest = {
        name : req.body.name as string,
        price : parseInt(req.body.price as string),
        category : req.body.category as string
    } ;
    console.log(product);
    const newProduct : Product = await store.create(product);
    res.send(newProduct);
};

const show = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.id as string);
    const user = await store.show(id);
    res.send(user);

}

const product_routes = ( app : express.Application) => {
    console.log('In product routes...');
    app.get('/products',index);
    app.post('/products',verifyAuthToken,create);
    app.get('/products/:id',show);
}

export default product_routes;
