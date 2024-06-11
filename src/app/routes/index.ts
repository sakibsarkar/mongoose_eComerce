import express from "express";
import userRoutes from "../Modules/user/user.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/user",
    route: userRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
