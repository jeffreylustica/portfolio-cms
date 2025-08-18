import express from "express";
import fetchPublicDocuments from "../../controllers/public/documents.controller.js";

const publicDocumentsRouter = express.Router();

publicDocumentsRouter.get("/:collection/documents", fetchPublicDocuments);

export default publicDocumentsRouter;
