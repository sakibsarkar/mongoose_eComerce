import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import Config from "./config";

const port = process.env.PORT || 5000;
let server: Server;

const startServer = async () => {
  await mongoose.connect(
    `mongodb+srv://${Config.dbUser}:${Config.dbPass}@cluster0.xbiw867.mongodb.net/${Config.dbName}`
  );

  server = app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON ${port}`);
  });
};

startServer();
