import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import { createProject } from "../controllers/projects.controller.js";

const projectsRouter = express.Router();

projectsRouter.post("/", authenticateToken, createProject);

export default projectsRouter;
