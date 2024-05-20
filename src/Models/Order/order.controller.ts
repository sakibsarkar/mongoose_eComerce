import { Request, Response } from "express";
import { IAnyObject } from "../../utils/types";
import { zodOrder } from "./order.interface";
import orderServices from "./order.service";

// order services
const { createOrderService, getAllOrderService } = orderServices;

export const createOrderController = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.send({
      success: false,
      messaeg: "No content found",
    });
  }
  const { success, data, error } = zodOrder.safeParse(body);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  await createOrderService(data, res);
};

// get all order
export const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // response data
    const response = {
      message: "Orders fetched successfully!",
    };

    const find: IAnyObject = {};
    if (email) {
      find.email = email;
      response.message = "Orders fetched successfully for user email!";
    }

    const result = await getAllOrderService(find);
    if (result.length <= 0 && email) {
      response.message = "Order not found";
    }

    res.status(200).json({
      success: result.length > 0,
      ...response,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};
