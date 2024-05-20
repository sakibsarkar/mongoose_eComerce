import express from "express";
import { createProduct } from "./product.controller";
const router = express.Router();

// create product
router.post("/products", createProduct);

export default router;
