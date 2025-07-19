import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import { createFile } from "../controllers/files.controller.js";

const filesRouter = express.Router();

filesRouter.post("/", authenticateToken, createFile);

export default filesRouter;
