import Client from '../database';

export type Order = {
  id?: number;
  productId: number;
  quantity: number;
  userId: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const sql = 'SELECT * FROM orders';
    try {
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('SHOW Error - ' + err);
    }
  }

  async create(order: Order): Promise<Order> {
    const sql =
      'INSERT INTO orders(product_id,quantity,user_id,status) VALUES($1,$2,$3,$4) RETURNING *';
    try {
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        order.productId,
        order.quantity,
        order.userId,
        order.status
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('CREATE Error - ' + err);
    }
  }

  async show(orderId: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find orders for orderId id ${orderId}. Error: ${err}`
      );
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE orders WHERE id=($1) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not order user ${id}. Error: ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE orders SET quantity = ($3), status = ($4) WHERE user_id=($1) and product_id = $(2)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        order.userId,
        order.productId,
        order.quantity,
        order.status
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find orders for user id ${order.userId}. Error: ${err}`
      );
    }
  }

  async currentOrders(userId: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) and status = ($2) ';
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId, 'ACTIVE']);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find orders for user id ${userId}. Error: ${err}`
      );
    }
  }

  async completedOrders(userId: number): Promise<Order[]> {
    try {
      const status = 'COMPLETE';
      const sql = 'SELECT * FROM orders WHERE user_id=($1) and status = ($2) ';
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId, status]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find orders for user id ${userId}. Error: ${err}`
      );
    }
  }

  async addProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId, quantity]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add products for order id ${orderId}. Error: ${err}`
      );
    }
  }
}
