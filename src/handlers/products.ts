import express from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/authentication';

const store = new ProductStore();

const index = async (req: express.Request, res: express.Response) => {
  const users = await store.index();
  res.send(users);
};

const create = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    name: req.body.name as string,
    price: parseInt(req.body.price as string),
    category: req.body.category as string
  };
  const newProduct: Product = await store.create(product);
  res.send(newProduct);
};

const show = async (req: express.Request, res: express.Response) => {
  const id: number = parseInt(req.params.id as string);
  const user = await store.show(id);
  res.send(user);
};

const getProductsByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const category: string = req.params.category as string;
  const user = await store.getProductsByCategory(category);
  res.send(user);
};

const product_routes = (app: express.Application) => {
  console.log('In product routes...');
  app.get('/products', index);
  app.post('/products', verifyAuthToken, create);
  app.get('/products/:id', show);
  app.get(
    '/products/category/:category',
    verifyAuthToken,
    getProductsByCategory
  );
};

export default product_routes;
