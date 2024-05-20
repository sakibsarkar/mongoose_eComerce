"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const order_routes_1 = __importDefault(require("./Models/Order/order.routes"));
const product_routes_1 = __importDefault(require("./Models/Product/product.routes"));
const app = (0, express_1.default)();
// middleweres
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use("/api", product_routes_1.default);
app.use("/api", order_routes_1.default);
exports.default = app;
