import express from "express";
import { createPersonalDetails } from "../controllers/personalDetails.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const personalDetailsRouter = express.Router();

personalDetailsRouter.post("/create", authenticateToken, createPersonalDetails);

export default personalDetailsRouter;
