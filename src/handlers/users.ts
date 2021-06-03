import express from 'express';
import {User, UserStore} from '../models/user';
import verifyAuthToken from '../middleware/authentication';
import jwt from 'jsonwebtoken'

type UserRequest = { firstName: string, lastName : string, password : string };

const store = new UserStore();

const index = async (req : express.Request ,res : express.Response) => {
    const users = await store.index();
    res.send(users);
};

const create = async (req : express.Request ,res : express.Response) => {
    const user : User = {
        firstName : req.body.firstName as string,
        lastName : req.body.lastName as string,
        password : req.body.password as string
    } ;
    console.log(user);
    const token : string = await store.create(user);
    res.send(token);
};

const show = async (req : express.Request ,res : express.Response) =>{
    const id : number = parseInt(req.params.id as string);
    const user = await store.show(id);
    res.send(user);

}

const authenticate = async (req: express.Request, res: express.Response) => {
    
    const id : number =  parseInt(req.body.id as string)
    const  password: string = req.body.password as string
    
    try {
        const user = await store.authenticate(id, password)
        if(user !== null){
            var token = jwt.sign(id.toString, process.env.TOKEN_SECRET as string);
            res.json(token)
        }
        else{
            res.json("Please Sign up!");
        }
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }
  

const user_routes = ( app : express.Application) => {
    console.log("Here...");
    app.get('/users/:id/authenticate',authenticate)
    app.get('/users',verifyAuthToken,index);
    app.post('/users',create);
    app.get('/users/:id',verifyAuthToken,show);
}

export default user_routes;
