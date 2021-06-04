import supertest from 'supertest';
import app from '../../src/server';
import { UserStore } from '../../src/models/user';

const token: string = process.env.TEST_TOKEN as string;

const request = supertest(app);

describe('User Endpoint Testing', () => {
  beforeAll(() => {
    spyOn(UserStore.prototype, 'create').and.returnValue(
      Promise.resolve(token)
    );
  });
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
