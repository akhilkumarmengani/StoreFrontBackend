# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : '/products' [GET]
- Show  : '/products/:id' [GET]
- Create [token required] : '/products' [POST]
- [OPTIONAL] Top 5 most popular products : '/products/top/:size' [GET]
- [OPTIONAL] Products by category (args: product category) : '/products/category/:category' [get]

#### Users
- Index [token required] : '/users' [GET]
- Show [token required] : '/users/:id'
- Create N[token required] : '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required] '/orders/users/:user_id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : '/orders/users/:id/orders-completed' [GET]
## Data Shapes
#### Product
-  id 
- name
- price
- [OPTIONAL] category
Table: Products (id:primary key, name:varchar, price:number, category:varchar)

#### User
- id
- firstName
- lastName
- password
Table: Users (id:primary key, firstName:varchar, lastName:varchar , password:string)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Table: Orders (id:primary key, product_id:number[foreign key to products table], quantity:number , user_id:number [foreign key to users table], status: varchar)

#### Orders-Products table
- id
- id of each product in the order
- order_id



