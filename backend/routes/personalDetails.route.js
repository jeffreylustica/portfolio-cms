import express from "express";
import { createPersonalDetails, updatePersonalDetails, deletePersonalDetails } from "../controllers/personalDetails.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const personalDetailsRouter = express.Router();

personalDetailsRouter.post("/", authenticateToken, createPersonalDetails);
personalDetailsRouter.put("/:id", authenticateToken, updatePersonalDetails)
personalDetailsRouter.delete("/:id", authenticateToken, deletePersonalDetails)

export default personalDetailsRouter;
