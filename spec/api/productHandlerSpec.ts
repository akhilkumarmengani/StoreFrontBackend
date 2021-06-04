import supertest from 'supertest';
import app from '../../src/server';
import { ProductStore } from '../../src/models/product';
const token: string = process.env.TEST_TOKEN as string;

const request = supertest(app);

describe('Product Endpoint Testing', () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        name: 'Cricket Bat',
        price: 10,
        category: 'Sports'
      })
    );
  });
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
