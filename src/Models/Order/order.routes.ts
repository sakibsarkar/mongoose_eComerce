import express from "express";
import { createOrderController } from "./order.controller";

const router = express.Router();

// create single product
router.post("/orders",createOrderController);

export default router;
