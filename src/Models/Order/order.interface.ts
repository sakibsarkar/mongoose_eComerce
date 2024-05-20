import { Schema } from "mongoose";
import { z } from "zod";

interface IOrder {
  email: string;
  productId: string | Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

// order zod validation
export const zodOrder = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default IOrder;
