import express from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/authentication';

const store = new OrderStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    productId: parseInt(req.body.productId as string),
    quantity: parseInt(req.body.quantity as string),
    userId: parseInt(req.body.userId as string),
    status: req.body.status as string
  };
  try {
    const newOrder: Order = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id as string);
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    productId: parseInt(req.body.productId as string),
    quantity: parseInt(req.body.quantity as string),
    userId: parseInt(req.body.userId as string),
    status: req.body.status as string
  };
  try {
    const updateOrder = await store.update(order);
    res.json(updateOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrders = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.user_id as string);
  try {
    const user = await store.currentOrders(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completedOrders = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.user_id as string);
  try {
    const user = await store.completedOrders(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const order_id: number = parseInt(req.params.id as string);
  const product_id: number = parseInt(req.body.productId as string);
  const quantity: number = parseInt(req.body.quantity as string);
  try {
    const addedProduct = await store.addProduct(order_id, product_id, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application): void => {
  console.log('In order routes...');
  app.get('/orders', verifyAuthToken, index);
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/:id', verifyAuthToken, show);
  app.put('/orders', verifyAuthToken, update);
  app.get('/orders/users/:user_id', verifyAuthToken, currentOrders);
  app.get(
    '/orders/users/:user_id/orders-completed',
    verifyAuthToken,
    completedOrders
  );
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default order_routes;
