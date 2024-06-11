import { Router } from "express";
import { validSchema } from "../../middlewere/validator";
import { createUserIntoDB } from "./user.controller";
import { userValidationSchema } from "./user.validation";
const router = Router();
router.post("/create", validSchema(userValidationSchema), createUserIntoDB);

const userRoutes = router;
export default userRoutes;
