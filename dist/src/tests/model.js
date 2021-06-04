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
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var user_1 = require("../models/user");
var order_1 = require("../models/order");
var userStore = new user_1.UserStore();
describe('User Model Test', function () {
    it('Get All Users Test', function () {
        expect(userStore.index).toBeDefined();
    });
    it('Get User By UserId Test', function () {
        expect(userStore.show).toBeDefined();
    });
    it('Create User Test', function () {
        expect(userStore.create).toBeDefined();
    });
    it('Delete User Test', function () {
        expect(userStore.delete).toBeDefined();
    });
    it('Show all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.index()];
                case 1:
                    result = _a.sent();
                    expect(result[0].id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Retrieving User By Id Test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 1;
                    return [4 /*yield*/, userStore.show(userId)];
                case 1:
                    result = _a.sent();
                    expect(result.id).toEqual(userId);
                    return [2 /*return*/];
            }
        });
    }); });
});
var orderStore = new order_1.OrderStore();
describe('Order Model Test', function () {
    it('Get All Orders Test', function () {
        expect(orderStore.index).toBeDefined();
    });
    it('Get Order By OrderId Test', function () {
        expect(orderStore.show).toBeDefined();
    });
    it('Create Order Test', function () {
        expect(orderStore.create).toBeDefined();
    });
    it('Delete Order Test', function () {
        expect(orderStore.delete).toBeDefined();
    });
    it('Show current orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 1;
                    return [4 /*yield*/, orderStore.currentOrders(userId)];
                case 1:
                    result = _a.sent();
                    expect(result[0].status).toEqual('ACTIVE');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Retrieving Order By Id Test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderId, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = 1;
                    return [4 /*yield*/, orderStore.show(orderId)];
                case 1:
                    order = _a.sent();
                    expect(order.id).toEqual(orderId);
                    return [2 /*return*/];
            }
        });
    }); });
});
var productStore = new product_1.ProductStore();
describe('Product Model Test', function () {
    it('Get All Products Test', function () {
        expect(productStore.index).toBeDefined();
    });
    it('Get Product By ProductId Test', function () {
        expect(productStore.show).toBeDefined();
    });
    it('Create Product Test', function () {
        expect(productStore.create).toBeDefined();
    });
    it('Delete Product Test', function () {
        expect(productStore.delete).toBeDefined();
    });
    it('Show all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.index()];
                case 1:
                    result = _a.sent();
                    expect(result[0].id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Retrieving Product By Id Test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = 1;
                    return [4 /*yield*/, productStore.show(productId)];
                case 1:
                    product = _a.sent();
                    expect(product.id).toEqual(productId);
                    return [2 /*return*/];
            }
        });
    }); });
});
