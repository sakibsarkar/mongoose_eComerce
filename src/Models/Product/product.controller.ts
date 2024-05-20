import { Request, Response } from "express";

import { IAnyObject } from "../../utils/types";
import { zodProduct } from "./product.interface";
import productService from "./product.service";

// productServices
const {
  createProductService,
  deleteSingleProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
} = productService;

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

    const result = await createProductService(data);

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
    const { searchTerm } = req.query;

    const find: IAnyObject = {};
    if (searchTerm) {
      find.name = new RegExp(searchTerm as string, "i");
    }

    const result = await getAllProductService(find);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "products not  find",
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
    const productId = req.params.productId;

    const result = await getSingleProductService(productId);
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
    res.status(400).json({
      success: false,
      message: "Product not found",
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
    const productId = req.params.productId;
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }

    const result = await updateSingleProductService(productId, req.body);

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
    res.status(400).json({
      success: false,
      message: "Couldn't update data",
      error,
    });
  }
};

// delete single product
export const deleteSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const result = await deleteSingleProductService(productId);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete product",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete product",
      error,
    });
  }
};
