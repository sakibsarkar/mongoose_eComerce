import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5000;
let server: Server;

const startServer = async () => {
  server = app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON ${port}`);
  });
};

startServer();
