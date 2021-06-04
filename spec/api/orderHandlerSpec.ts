import supertest from 'supertest';
import app from '../../src/server';
import { OrderStore } from '../../src/models/order';

const token: string = process.env.TEST_TOKEN as string;

const request = supertest(app);

describe('Order Endpoint Testing', () => {
  beforeAll(() => {
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
