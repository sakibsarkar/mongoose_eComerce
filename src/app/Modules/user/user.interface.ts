import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";
interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export default IUser;

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
