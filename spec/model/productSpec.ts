import { Product, ProductStore } from '../../src/models/product';

const productStore: ProductStore = new ProductStore();

describe('Product Model Test', () => {
  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
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

  it('Creating Product Test', async () => {
    const result = await productStore.create({
      name: 'Nokia',
      price: 10,
      category: 'TV'
    });
    expect(result).toBeDefined();
  });

  it('Show all products', async () => {
    const result: Product[] = await productStore.index();
    expect(result[0].id).toEqual(1);
  });

  it('Retrieving Product By Id Test', async () => {
    const productId = 1;
    const product: Product = await productStore.show(productId);
    expect(product.id).toEqual(productId);
  });
});
