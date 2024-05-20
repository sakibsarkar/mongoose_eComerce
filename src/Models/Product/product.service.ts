import IProduct from "./product.interface";
import Product from "./product.model";

const createProductService = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const productService = {
  createProductService,
};

export default productService;
