import express from "express";
// import fetchPublicDocuments from "../../controllers/public/documents.controller.js";
import fetchDocuments from '../../controllers/documents.controller.js'

const publicDocumentsRouter = express.Router();

publicDocumentsRouter.get("/:collection/documents", fetchDocuments);

export default publicDocumentsRouter;
