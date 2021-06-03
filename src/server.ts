import express from 'express';
import user_routes from './handlers/users';
import product_routes from './handlers/products';
import order_routes from './handlers/orders';
import jwt from 'jsonwebtoken';

const app: express.Application = express();

app.use(express.json());

app.listen(3000);
console.log('Listening on port - ' + 3000);
user_routes(app);
product_routes(app);
order_routes(app);

export default app;
