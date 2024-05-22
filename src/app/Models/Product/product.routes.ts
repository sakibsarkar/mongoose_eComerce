import express from "express";
import {
  createProductController,
  deleteSingleProductController,
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
router.get("/products/:productId", getSingleProductController);
// update single product
router.put("/products/:productId", updateSingleProductController);
// delete single product
router.delete("/products/:productId", deleteSingleProductController);
export default router;
