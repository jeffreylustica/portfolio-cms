import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import fetchCollections from "../controllers/collections.controller.js";

const collectionsRouter = express.Router();

collectionsRouter.get("/", authenticateToken, fetchCollections);

export default collectionsRouter;
