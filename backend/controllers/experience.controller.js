import {
  createExperienceService,
  updateExperienceService,
  deleteExperienceService,
} from "../services/experience.service.js";

const createExperience = async (req, res, next) => {
  try {
    const employmentHistoryData = req.body;
    const employmentHistory = await createExperienceService(
      employmentHistoryData
    );
    res.status(201).json({
      details: employmentHistory,
      message: "Employment history created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experienceData = req.body;
    const updatedExperience = await updateExperienceService(id, experienceData);
    res.status(200).json({
      details: updatedExperience,
      message: "Employment history updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedExperience = await deleteExperienceService(id);
    res.status(200).json({
      details: deletedExperience,
      message: "Employment history deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createExperience, updateExperience, deleteExperience };
