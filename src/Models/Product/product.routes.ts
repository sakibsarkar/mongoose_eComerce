import express from "express";
import {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateSingleProductController,
} from "./product.controller";
const router = express.Router();

// create single product
router.post("/products", createProductController);
// get all products
router.get("/products", getAllProductController);
// id based single product
router.get("/products/:id", getSingleProductController);
// update single product
router.put("/products/:id", updateSingleProductController);
export default router;
