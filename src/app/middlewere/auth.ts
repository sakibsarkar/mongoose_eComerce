import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../Modules/user/user.model";
import Config from "../config";
import AppError from "../errors/AppError";

export const isAuthenticatedUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const getToken = req.header("Authorization");

    if (!getToken)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const token = getToken.split(" ")[1];
    const decoded: any = jwt.verify(token, Config.jwt_access_secret as string);

    if (!decoded)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await User.findOne({ _id: decoded?._id }).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export const authorizeRoles = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.user_type)) {
      throw new AppError(403, "Forbiden access");
    }
    next();
  };
};
