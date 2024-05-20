import { Request, Response } from "express";
import { zodProduct } from "./product.interface";
import productService from "./product.service";

// create a new product
export const createProductController = async (req: Request, res: Response) => {
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

// get all products
export const getAllProductController = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductService();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const result = await productService.getSingleProductService(productId);
    if (!result) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    res.send({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
