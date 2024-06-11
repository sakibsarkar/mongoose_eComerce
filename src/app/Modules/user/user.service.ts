import IUser from "./user.interface";
import { User } from "./user.model";

export const createUserService = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const userService = {
  createUserService,
};
export default userService;
