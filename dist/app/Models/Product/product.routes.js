"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// create single product
router.post("/products", product_controller_1.createProductController);
// get all products
router.get("/products", product_controller_1.getAllProductController);
// id based single product
router.get("/products/:productId", product_controller_1.getSingleProductController);
// update single product
router.put("/products/:productId", product_controller_1.updateSingleProductController);
// delete single product
router.delete("/products/:productId", product_controller_1.deleteSingleProductController);
exports.default = router;
