import express from "express";
import {
  createProductController,
  getAllProductController,
  getSingleProduct,
} from "./product.controller";
const router = express.Router();

// create single product
router.post("/products", createProductController);
// get all products
router.get("/products", getAllProductController);
// id based single product
router.get("/products/:id", getSingleProduct);
// update single product
router.put("/products/:id", getSingleProduct);
export default router;
