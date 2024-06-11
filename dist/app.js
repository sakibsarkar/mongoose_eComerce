"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const globalError_1 = __importDefault(require("./app/middlewere/globalError"));
const not_foun_1 = require("./app/middlewere/not-foun");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Hello from server");
});
// 404 Handler
app.use(not_foun_1.notFound);
/* eslint-disable @typescript-eslint/no-explicit-any */
app.use(globalError_1.default);
exports.default = app;
