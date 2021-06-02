import express from 'express';
import {User, UserStore} from '../models/user';
import verifyAuthToken from '../middleware/authentication';

type UserRequest = { firstName: string, lastName : string, password : string };

const store = new UserStore();

const index = async (req : express.Request ,res : express.Response) => {
    const users = await store.index();
    res.send(users);
};

const create = async (req : express.Request ,res : express.Response) => {
    const user : UserRequest = {
        firstName : req.body.firstName as string,
        lastName : req.body.lastName as string,
        password : req.body.password as string
    } ;
    console.log(user);
    const newUser : User = await store.create(user);
    res.send(newUser);
};

const show = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.id as string);
    const user = await store.show(id);
    res.send(user);

}

const user_routes = ( app : express.Application) => {
    console.log("Here...");
    app.get('/users',verifyAuthToken,index);
    app.post('/users',verifyAuthToken,create);
    app.get('/users/:id',verifyAuthToken,show);
}

export default user_routes;
