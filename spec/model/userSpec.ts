import { User, UserStore } from '../../src/models/user';

const userStore: UserStore = new UserStore();

describe('User Model Testing', () => {
  beforeAll(async (done): Promise<void> => {
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
    console.log('Creating User');
    await userStore.create({
      firstName: 'kevin',
      lastName: 'eyong',
      password: 'thisismeenow2020#'
    });
    done();
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

  it('Creating User Test', async (done) => {
    const userDetails = {
      firstName: 'Akhil',
      lastName: 'Mengani',
      password: '1234'
    };
    const result = await userStore.create(userDetails);
    expect(result).toBeDefined();
    done();
  });

  it('Show all users', async (done) => {
    const result: User[] = await userStore.index();
    console.log(result[0].id);
    expect(result[0].id as number).toEqual(1);
    done();
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
