import dotenv from "dotenv";
dotenv.config();
const Config = {
  dbUser: process.env.MONGO_NAME,
  dbPass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_DBNAME,
  bcrypt_salt_rounds: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  nodeEnv: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: "1d",
  jwt_refresh_expires_in: "120d",
};

export default Config;
