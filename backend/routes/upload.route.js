import express from "express";
import { upload } from "../utils/multer.js";
import { authenticateToken } from "../utils/authMiddleware.js";
import { uploadFile } from "../controllers/uploads.controller.js";

const uploadsRouter = express.Router();

uploadsRouter.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  uploadFile
);

export default uploadsRouter;
