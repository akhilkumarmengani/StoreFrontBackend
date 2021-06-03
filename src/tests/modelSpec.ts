import {Product,ProductStore} from '../models/product'
import {User,UserStore} from '../models/user'
import {Order,OrderStore} from '../models/order'

const userStore : UserStore = new UserStore();

describe('User Model Test', ()=>{
    it('Get All Users Test', () => {
        expect(userStore.index).toBeDefined();
      });
    
      it('Get User By UserId Test', () => {
        expect(userStore.show).toBeDefined();
      });
    
      it('Create User Test', () => {
        expect(userStore.create).toBeDefined();
      });

      it('Creating User Test'), async () =>{
          const userDetails = {firstName : 'Akhil', lastName : 'Kumar', password : '1234'};
          const result = await userStore.create(userDetails);
          expect(result).toBeDefined();
      }

      it('Retrieving User By Id Test', async ()=>{
        const userId : number = 1;
        const result : User = await userStore.show(userId);
        expect(result.id).toEqual(userId);
      });
});

const orderStore : OrderStore = new OrderStore();

describe('Order Model Test', ()=>{
    it('Get All Orders Test', () => {
        expect(orderStore.index).toBeDefined();
      });
    
      it('Get Order By OrderId Test', () => {
        expect(orderStore.show).toBeDefined();
      });
    
      it('Create Order Test', () => {
        expect(orderStore.create).toBeDefined();
      });

      it('Creating Order Test'), async () =>{
          const result = await orderStore.create({productId : 1, userId : 1, quantity : 10 , status : 'COMPLETE'});
          expect(result).toBeDefined();
      }

      it('Retrieving Order By Id Test', async ()=>{
        const orderId : number = 1;
        const order : Order = await orderStore.show(orderId);
        expect(order.id).toEqual(orderId);
      });
});


const productStore : ProductStore = new ProductStore();

describe('Product Model Test', ()=>{
    it('Get All Products Test', () => {
        expect(productStore.index).toBeDefined();
      });
    
      it('Get Product By ProductId Test', () => {
        expect(productStore.show).toBeDefined();
      });
    
      it('Create Product Test', () => {
        expect(productStore.create).toBeDefined();
      });

      it('Creating User Test'), async () =>{
          const result = await productStore.create({name : 'Nokia', price : 10 , category : 'TV'});
          expect(result).toBeDefined();
      }

      it('Retrieving Product By Id Test', async ()=>{
        const productId : number = 1;
        const product : Product = await productStore.show(productId);
        expect(product.id).toEqual(productId);
      });
});