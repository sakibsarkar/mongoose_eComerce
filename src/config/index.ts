import dotenv from "dotenv";
dotenv.config();

const Config = {
  test: process.env.test,
};

export default Config;
