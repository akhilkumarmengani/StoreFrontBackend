import { User, UserStore } from '../../src/models/user';

const userStore: UserStore = new UserStore();

describe('User Model Testing', () => {
  beforeAll(async function () {
    spyOn(UserStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstName: 'Ravindra',
          lastName: 'Jadeja',
          password: 'CSK123'
        }
      ])
    );

    spyOn(UserStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'Suresh',
        lastName: 'Raina',
        password: 'CSK673'
      })
    );
  });
  it('Get All Users Test', () => {
    expect(userStore.index).toBeDefined();
  });

  it('Get User By UserId Test', () => {
    expect(userStore.show).toBeDefined();
  });

  it('Create User Test', () => {
    expect(userStore.create).toBeDefined();
  });

  it('Delete User Test', () => {
    expect(userStore.delete).toBeDefined();
  });

  it('Creating User Test', async () => {
    const userDetails = {
      firstName: 'Akhil',
      lastName: 'Mengani',
      password: '1234'
    };
    const result = await userStore.create(userDetails);
    expect(result).toBeDefined();
  });

  it('Show all users', async () => {
    const result: User[] = await userStore.index();
    expect(result[0].id as number).toEqual(1);
  });

  it('Retrieving User By Id Test', async () => {
    const result: User = await userStore.show(1);
    expect(result).toEqual({
      id: 1,
      firstName: 'Suresh',
      lastName: 'Raina',
      password: 'CSK673'
    });
  });
});
