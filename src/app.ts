import express, { Request, Response } from "express";
import morgan from "morgan";
import order from "./app/Models/Order/order.routes";
import product from "./app/Models/Product/product.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", product);
app.use("/api", order);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
