import express from "express"
import { authenticateToken } from "../utils/authMiddleware.js";
import { createSkill, updateSkill, deleteSkill } from "../controllers/skills.controller.js";

const skillsRouter = express.Router()

skillsRouter.post("/", authenticateToken, createSkill);
skillsRouter.put("/:id", authenticateToken, updateSkill)
skillsRouter.delete("/:id", authenticateToken, deleteSkill)

export default skillsRouter;

