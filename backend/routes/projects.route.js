import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projects.controller.js";
import { upload } from "../utils/multer.js";

const projectsRouter = express.Router();

projectsRouter.post("/", authenticateToken, createProject);
projectsRouter.put("/:id", authenticateToken, updateProject);
projectsRouter.delete("/:id", authenticateToken, deleteProject);

export default projectsRouter;
