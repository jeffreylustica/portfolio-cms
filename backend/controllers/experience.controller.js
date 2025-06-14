import { createExperienceService } from "../services/experience.service.js";

const createExperience = async (req, res, next) => {
    try {
        const employmentHistoryData = req.body;
        console.log(employmentHistoryData)
        const employmentHistory = await createExperienceService(employmentHistoryData);
        res.status(201).json({details: employmentHistory, message: "Employment history created successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export {createExperience}