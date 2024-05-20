import { Request, Response } from "express";
import { zodProduct } from "./product.interface";
import productService from "./product.service";

// create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    if (!body) {
      return res.status(400).send({
        success: false,
        message: "no data found",
      });
    }
    const { data, success, error } = zodProduct.safeParse(req.body);
    if (!success) {
      return res.json({
        success: false,
        message: "Invalid data formate",
        error,
      });
    }

    const result = await productService.createProductService(data);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
