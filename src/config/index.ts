import dotenv from "dotenv";
dotenv.config();

const Config = {
  dbUser: process.env.MONGO_NAME,
  dbPass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_DB,
};

export default Config;
