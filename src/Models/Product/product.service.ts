import { IAnyObject } from "../../utils/types";
import IProduct from "./product.interface";
import Product from "./product.model";

const createProductService = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductService = async (query: IAnyObject) => {
  const result = await Product.find(query);
  return result;
};

const getSingleProductService = async (id: string) => {
  const result = await Product.find({ _id: id });
  return result;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

const updateSingleProductService = async (
  id: string,
  updateData: IProduct | any
) => {
  const result = Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleProductService = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// services object
const productService = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
  deleteSingleProductService,
};

export default productService;
