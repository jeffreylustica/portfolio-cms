import express from "express";
import {
  signup,
  login,
  getUser,
  checkUserExists,
  checkUserLoggedIn,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/user", authenticateToken, getUser);
userRouter.get("/user-exists", checkUserExists);
userRouter.get("/user-loggedin", authenticateToken, checkUserLoggedIn);


export default userRouter;
