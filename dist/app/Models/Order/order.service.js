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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../Product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderService = (orderData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = orderData.productId;
        const response = {
            success: false,
            message: "",
        };
        // return if the order quantity is 0
        if (orderData.quantity < 1) {
            response.message = "Insufficient order quantity";
            response.success = false;
            return res.status(400).send(response);
        }
        // find the product
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            response.message = "Invalid product id";
            response.success = false;
            return res.status(400).json(response);
        }
        //   check if the product quantity
        const productObj = product.toObject();
        const availableQntt = productObj.inventory.quantity;
        const isStock = productObj.inventory.inStock;
        if (!isStock || orderData.quantity > availableQntt) {
            response.message = "Insufficient quantity available in inventory";
            response.success = false;
            return res.status(400).json(response);
        }
        //   check if the quantity is equal to available quantity
        const isEqualQntt = productObj.inventory.quantity === orderData.quantity;
        //   update the isStock propertry
        if (isEqualQntt) {
            yield product_model_1.default.findByIdAndUpdate(productId, { "inventory.inStock": false, "inventory.quantity": 0 }, { new: true, runValidators: true });
        }
        else {
            // set new product Quantity
            yield product_model_1.default.findByIdAndUpdate(productId, {
                "inventory.quantity": productObj.inventory.quantity - orderData.quantity,
            }, { new: true, runValidators: true });
        }
        //   set the order
        const result = yield order_model_1.default.create(orderData);
        response.message = "Order created successfully!";
        response.success = true;
        res.json(Object.assign(Object.assign({}, response), { data: result }));
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Cant't create order",
        });
    }
});
const getAllOrderService = (find) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find(find);
    return result;
});
const orderServices = {
    createOrderService,
    getAllOrderService,
};
exports.default = orderServices;
