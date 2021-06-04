"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = express_1.default();
app.use(express_1.default.json());
app.listen(3000);
console.log('Listening on port - ' + 3000);
users_1.default(app);
products_1.default(app);
orders_1.default(app);
exports.default = app;
