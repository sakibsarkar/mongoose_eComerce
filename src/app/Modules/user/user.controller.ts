import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { User } from "./user.model";
import userService from "./user.service";

const { createUserService } = userService;
export const createUserIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;
  const isExist = await User.isUserExistsByEmail(body.email);
  if (isExist) {
    return sendResponse(res, {
      success: false,
      message: "User already exist in this email",
      data: null,
      statusCode: 400,
    });
  }

  const result = await createUserService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});
