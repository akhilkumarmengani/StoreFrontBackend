"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
console.log('Environment - ' + NODE_ENV);
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(PORT),
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST
});
exports.default = client;
