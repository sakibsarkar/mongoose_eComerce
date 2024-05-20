import IProduct from "./product.interface";
import Product from "./product.model";

const createProductService = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductService = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductService = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// services object
const productService = {
  createProductService,
  getAllProductService,
  getSingleProductService,
};

export default productService;
