import express from "express";
import { signup, login, getUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/user", authenticateToken, getUser);

export default userRouter;
