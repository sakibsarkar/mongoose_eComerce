import { Request, Response } from "express";
import { zodOrder } from "./order.interface";
import orderServices from "./order.service";

// order services
const { createOrderService } = orderServices;

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

  await createOrderService(body, res);
};
