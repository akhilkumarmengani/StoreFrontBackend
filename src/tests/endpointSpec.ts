import UserHandler from '../handlers/users';
import ProductHandler from '../handlers/products';
import OrderHandler from '../handlers/orders';
import supertest from 'supertest';
import app from '../server';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';
import { OrderStore } from '../models/order';

const token: string = process.env.TEST_TOKEN as string;

const request = supertest(app);

describe('Endpoint Testing', () => {
  beforeAll(() => {
    spyOn(UserStore.prototype, 'create').and.returnValue(
      Promise.resolve(token)
    );
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        name: 'Cricket Bat',
        price: 10,
        category: 'Sports'
      })
    );
    spyOn(OrderStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        productId: 1,
        userId: 1,
        quantity: 10,
        status: 'ACTIVE'
      })
    );
  });

  describe('User Endpoint Testing', () => {
    it('Get all users testing', async () => {
      const response = await request
        .get('/users')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('Get User by Id', async () => {
      const response = await request
        .get('/users/1')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('Create New User', async () => {
      const response = await request
        .post('/users')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });
  });

  describe('Product Endpoint Testing', () => {
    it('Get all products testing', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });

    it('Get Product by Id', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });

    it('Create New Product', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });
  });

  describe('Order Endpoint Testing', () => {
    it('Get all orders testing', async () => {
      const response = await request
        .get('/orders')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('Get current orders for user', async () => {
      const response = await request
        .get('/orders/users/1')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });

    it('Get current orders for user', async () => {
      const response = await request
        .get('/orders/users/1/orders-completed')
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).toBe(200);
    });
  });
});
