import express from "express";
import {
  signup,
  login,
  // verifyToken,
  // getUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
// userRouter.get("/user", verifyToken, getUser);

export default userRouter;
