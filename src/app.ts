import express from "express";
import morgan from "morgan";
import product from "./Models/Product/product.routes";
const app = express();

// middleweres
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", product);

export default app;
