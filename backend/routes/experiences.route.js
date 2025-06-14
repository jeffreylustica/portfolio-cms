import express from "express"
import { authenticateToken } from "../utils/authMiddleware.js"
import { createExperience } from "../controllers/experience.controller.js";

const experienceRouter = express.Router()

experienceRouter.post("/", authenticateToken, createExperience);


export default experienceRouter