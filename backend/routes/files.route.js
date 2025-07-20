import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import {
  createFile,
  updateFile,
  deleteFile,
} from "../controllers/files.controller.js";

const filesRouter = express.Router();

filesRouter.post("/", authenticateToken, createFile);
filesRouter.put("/:id", authenticateToken, updateFile);
filesRouter.delete("/:id", authenticateToken, deleteFile);

export default filesRouter;
