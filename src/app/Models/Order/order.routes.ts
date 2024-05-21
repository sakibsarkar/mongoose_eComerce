import express from "express";
import {
  createOrderController,
  getAllOrderController,
} from "./order.controller";

const router = express.Router();

// create single product
router.post("/orders", createOrderController);
// get all orders
router.get("/orders", getAllOrderController);

export default router;
