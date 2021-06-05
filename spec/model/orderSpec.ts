import { Order, OrderStore } from '../../src/models/order';

const orderStore: OrderStore = new OrderStore();

describe('Order Model Test', () => {
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

    spyOn(OrderStore.prototype, 'currentOrders').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          productId: 1,
          userId: 1,
          quantity: 10,
          status: 'ACTIVE'
        }
      ])
    );

    spyOn(OrderStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        productId: 1,
        userId: 1,
        quantity: 10,
        status: 'ACTIVE'
      })
    );
  });
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
      status: 'ACTIVE'
    });
    expect(result).toBeDefined();
  });

  it('Show current orders', async () => {
    const result: Order[] = await orderStore.currentOrders(1);
    expect(result[0].status as string).toEqual('ACTIVE');
  });

  it('Retrieving Order By Id Test', async () => {
    const order: Order = await orderStore.show(1);
    expect(order.id as number).toEqual(1);
  });
});
