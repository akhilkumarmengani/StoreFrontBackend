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
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    productId: parseInt(req.body.productId),
                    quantity: parseInt(req.body.quantity),
                    userId: parseInt(req.body.userId),
                    status: req.body.status,
                };
                console.log(order);
                return [4 /*yield*/, store.create(order)];
            case 1:
                newOrder = _a.sent();
                res.send(newOrder);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, store.show(id)];
            case 1:
                order = _a.sent();
                res.send(order);
                return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, updateOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    productId: parseInt(req.body.productId),
                    quantity: parseInt(req.body.quantity),
                    userId: parseInt(req.body.userId),
                    status: req.body.status,
                };
                return [4 /*yield*/, store.update(order)];
            case 1:
                updateOrder = _a.sent();
                res.send(updateOrder);
                return [2 /*return*/];
        }
    });
}); };
var currentOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.user_id);
                return [4 /*yield*/, store.currentOrders(id)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [2 /*return*/];
        }
    });
}); };
var completedOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.user_id);
                return [4 /*yield*/, store.completedOrders(id)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [2 /*return*/];
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
};
exports.default = order_routes;
