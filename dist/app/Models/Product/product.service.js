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
const product_model_1 = __importDefault(require("./product.model"));
const createProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProductService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find(query);
    return result;
});
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOne({ _id: id });
    return result;
});
/* eslint-disable @typescript-eslint/no-explicit-any */
const updateSingleProductService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = product_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    return result;
});
// services object
const productService = {
    createProductService,
    getAllProductService,
    getSingleProductService,
    updateSingleProductService,
    deleteSingleProductService,
};
exports.default = productService;
