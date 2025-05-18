import express from 'express'
import { authenticateToken } from '../utils/authMiddleware.js'
import fetchDocuments from '../controllers/documents.controller.js'

const documentsRouter = express.Router()

documentsRouter.get("/:collection/documents", authenticateToken, fetchDocuments)

export default documentsRouter