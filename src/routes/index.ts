import express from "express";
import product from "../Models/Product/product.routes";
const router = express.Router();

router.use("/api", product);

export default router;
