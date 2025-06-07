import express from "express";
import {
  createPersonalDetail,
  updatePersonalDetail,
  deletePersonalDetail,
} from "../controllers/personalDetails.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const personalDetailsRouter = express.Router();

personalDetailsRouter.post("/", authenticateToken, createPersonalDetail);
personalDetailsRouter.put("/:id", authenticateToken, updatePersonalDetail);
personalDetailsRouter.delete("/:id", authenticateToken, deletePersonalDetail);

export default personalDetailsRouter;
