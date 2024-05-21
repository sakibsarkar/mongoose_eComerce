import { z } from "zod";

// -----  product interface ----
export interface IVariant {
  type: string;
  value: string;
}

export interface IInventory {
  quantity: number;
  inStock: boolean;
}

interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}

// ---- zod validation ------
const zodVariant = z.object({
  type: z.string(),
  value: z.string(),
});

const zodInventory = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

export const zodProduct = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(zodVariant),
  inventory: zodInventory,
});

export default IProduct;
