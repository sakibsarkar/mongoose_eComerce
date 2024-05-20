import express from "express";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// middleweres
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", routes);

export default app;
