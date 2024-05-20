import express, { Request, Response } from "express";
import morgan from "morgan";
import order from "./Models/Order/order.routes";
import product from "./Models/Product/product.routes";
const app = express();

// middleweres
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", product);
app.use("/api", order);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
