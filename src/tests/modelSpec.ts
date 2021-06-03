import { Product, ProductStore } from '../models/product';
import { User, UserStore } from '../models/user';
import { Order, OrderStore } from '../models/order';

const userStore: UserStore = new UserStore();

describe('User Model Test', () => {
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

  it('Show all users', async () => {
    const userId: number = 1;
    const result: User[] = await userStore.index();
    expect(result[0].id).toEqual(1);
  });

  it('Retrieving User By Id Test', async () => {
    const userId: number = 1;
    const result: User = await userStore.show(userId);
    expect(result.id).toEqual(userId);
  });
});

const orderStore: OrderStore = new OrderStore();

describe('Order Model Test', () => {
  it('Get All Orders Test', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('Get Order By OrderId Test', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('Create Order Test', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('Delete Order Test', () => {
    expect(orderStore.delete).toBeDefined();
  });

  it('Show current orders', async () => {
    const userId: number = 1;
    const result: Order[] = await orderStore.currentOrders(userId);
    expect(result[0].status).toEqual('ACTIVE');
  });

  it('Retrieving Order By Id Test', async () => {
    const orderId: number = 1;
    const order: Order = await orderStore.show(orderId);
    expect(order.id).toEqual(orderId);
  });
});

const productStore: ProductStore = new ProductStore();

describe('Product Model Test', () => {
  it('Get All Products Test', () => {
    expect(productStore.index).toBeDefined();
  });

  it('Get Product By ProductId Test', () => {
    expect(productStore.show).toBeDefined();
  });

  it('Create Product Test', () => {
    expect(productStore.create).toBeDefined();
  });

  it('Delete Product Test', () => {
    expect(productStore.delete).toBeDefined();
  });

  it('Show all products', async () => {
    const userId: number = 1;
    const result: Product[] = await productStore.index();
    expect(result[0].id).toEqual(1);
  });

  it('Retrieving Product By Id Test', async () => {
    const productId: number = 1;
    const product: Product = await productStore.show(productId);
    expect(product.id).toEqual(productId);
  });
});
