import express from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/authentication';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    firstName: req.body.firstname as string,
    lastName: req.body.lastname as string,
    password: req.body.password as string
  };
  try {
    const token: string = await store.create(user);
    res.send(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id as string);
  try {
    const user = await store.show(id);
    res.send(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.body.id as string);
  const password: string = req.body.password as string;

  try {
    const user = await store.authenticate(id, password);
    if (user !== null) {
      const token = jwt.sign(id.toString(), process.env.TOKEN_SECRET as string);
      res.json(token);
    } else {
      res.json('Please Sign up!');
    }
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const user_routes = (app: express.Application): void => {
  console.log('In user routes...');
  app.get('/users/:id/authenticate', authenticate);
  app.get('/users', verifyAuthToken, index);
  app.post('/users', create);
  app.get('/users/:id', verifyAuthToken, show);
};

export default user_routes;
