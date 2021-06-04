"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var authentication_1 = __importDefault(require("../middleware/authentication"));
var store = new order_1.OrderStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    productId: parseInt(req.body.productId),
                    quantity: parseInt(req.body.quantity),
                    userId: parseInt(req.body.userId),
                    status: req.body.status
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(order)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.show(id)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, updateOrder, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    productId: parseInt(req.body.productId),
                    quantity: parseInt(req.body.quantity),
                    userId: parseInt(req.body.userId),
                    status: req.body.status
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(order)];
            case 2:
                updateOrder = _a.sent();
                res.json(updateOrder);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var currentOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.user_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.currentOrders(id)];
            case 2:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var completedOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.user_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.completedOrders(id)];
            case 2:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400);
                res.json(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, product_id, quantity, addedProduct, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params.id);
                product_id = parseInt(req.body.productId);
                quantity = parseInt(req.body.quantity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(order_id, product_id, quantity)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(400);
                res.json(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var order_routes = function (app) {
    console.log('In order routes...');
    app.get('/orders', authentication_1.default, index);
    app.post('/orders', authentication_1.default, create);
    app.get('/orders/:id', authentication_1.default, show);
    app.put('/orders', authentication_1.default, update);
    app.get('/orders/users/:user_id', authentication_1.default, currentOrders);
    app.get('/orders/users/:user_id/orders-completed', authentication_1.default, completedOrders);
    app.post('/orders/:id/products', authentication_1.default, addProduct);
};
exports.default = order_routes;
