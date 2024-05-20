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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

// get single product
export const getSingleProductController = async (
  req: Request,
  res: Response
) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

// update single product
export const updateSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }

    const result = await productService.updateSingleProductService(
      productId,
      req.body
    );

    console.log(result, "log");

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't update data",
      error,
    });
  }
};
