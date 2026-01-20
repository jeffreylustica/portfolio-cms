import express from "express";
import fetchCollections from "../../controllers/collections.controller.js";

const publicCollectionsRouter = express.Router();

publicCollectionsRouter.get("/", fetchCollections);

export default publicCollectionsRouter;

