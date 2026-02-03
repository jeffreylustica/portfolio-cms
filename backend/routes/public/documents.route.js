import express from "express";
import fetchDocuments from '../../controllers/documents.controller.js'

const publicDocumentsRouter = express.Router();

publicDocumentsRouter.get("/:collection/documents", fetchDocuments);

export default publicDocumentsRouter;
