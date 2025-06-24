import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

const experienceRouter = express.Router();

experienceRouter.post("/", authenticateToken, createExperience);
experienceRouter.put("/:id", authenticateToken, updateExperience);
experienceRouter.delete("/:id", authenticateToken, deleteExperience);

export default experienceRouter;
