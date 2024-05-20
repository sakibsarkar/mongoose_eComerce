import { Request, Response } from "express";
import { zodProduct } from "./product.interface";

// create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.status(400).send({
      success: false,
      message: "no data found",
    });
  }

  const zodValid = zodProduct.parse(req.body);
};
