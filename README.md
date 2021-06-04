# Storefront Backend Project

## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Installation
```
$ npm init -y

$ npm i --save-dev @types/express @types/jasmine @types/jsonwebtoken @types/node @types/pg @types/supertest @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier nodemon prettier ts-node
   
$ npm i express jasmine jasmine-spec-reporter bcrypt db-migrate db-migrate-pg dotenv jsonwebtoken pg supertest typescript

```

## Database Setup

### Create User 
```
CREATE USER admin WITH PASSWORD 'Akhil123';
```
### Create Databases
```
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```
### Connect to Dev Database
```
\c storefront
```

### Grant Privileges to Dev Database
```
GRANT ALL PRIVILEGES ON DATABASE storefront TO admin;
```

### Connect to Test Database
```
\c storefront_test
```

### Grant Privileges to Test Database 
```
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO admin;
```

### Migrate Up Databases
Dev
```
db-migrate up --config database.json -e dev
```

Test
```
db-migrate up --config database.json -e test
```

### Migrate Down Databases
Dev
```
db-migrate down --config database.json -e dev
```

Test
```
db-migrate down --config database.json -e test
```

## Environment Variables
I have not ignored .env file for now. will include that .gitignore later.

```
POSTGRES_HOST= 127.0.0.1
POSTGRES_DB = storefront
POSTGRES_USER = admin
POSTGRES_PASSWORD = Akhil123
POSTGRES_DB_TEST = storefront_test
NODE_ENV = dev 
PORT = 5432
TOKEN_SECRET = I_AM_THE_LAST_JEDI

SALT_ROUNDS = 10
BCRYPT_PASSWORD = UNBREAKABLE

TEST_TOKEN = eyJhbGciOiJIUzI1NiJ9.MQ.SMntCq5FXdlRgXKQZztNsTeecF7EdLXPeUpop53SUlY
```


## Scripts

### Start Application
```
$ npm run start
```
### Build Application
```
$ npm run build
```
### Build and Test Specs
```
$ npm run test
```
### Prettier
```
$ npm run prettier
```
### ESLint
```
$ npm run lint
```


