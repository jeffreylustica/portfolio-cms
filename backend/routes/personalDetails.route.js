import express from 'express'
import { createPersonalDetails } from '../controllers/personalDetails.controller.js'

const personalDetailsRouter = express.Router()

personalDetailsRouter.post("/create", createPersonalDetails)

export default personalDetailsRouter