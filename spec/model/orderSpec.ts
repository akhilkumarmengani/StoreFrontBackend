import { Order, OrderStore } from '../../src/models/order';

const orderStore: OrderStore = new OrderStore();

describe('Order Model Test', () => {
  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
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

  it('Creating Order Test', async () => {
    const result = await orderStore.create({
      productId: 1,
      userId: 1,
      quantity: 10,
      status: 'COMPLETE'
    });
    expect(result).toBeDefined();
  });

  it('Show current orders', async () => {
    const userId = 1;
    const result: Order[] = await orderStore.currentOrders(userId);
    expect(result[0].status).toEqual('ACTIVE');
  });

  it('Retrieving Order By Id Test', async () => {
    const orderId = 1;
    const order: Order = await orderStore.show(orderId);
    expect(order.id).toEqual(orderId);
  });
});
