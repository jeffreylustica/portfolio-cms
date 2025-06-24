import Experience from "../model/experience.model.js";

const createExperienceService = async (data) => {
  try {
    const createdExperience = new Experience(data);
    const savedExperience = await createdExperience.save();
    return savedExperience;
  } catch (error) {
    console.error("Error creating employment history:", error);
    throw new Error("Failed to create employment history. Please try again.");
  }
};

const updateExperienceService = async (id, data) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedExperience) {
      throw new Error("Employment history not found");
    }
    return updatedExperience;
  } catch (error) {
    console.error("Error updating employment history:", error);
    throw new Error("Failed to update employment history. Please try again.");
  }
};

const deleteExperienceService = async (id) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      throw new Error("Employment history not found");
    }
    return deletedExperience;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete employment history. Please try again.");
  }
};

export {
  createExperienceService,
  updateExperienceService,
  deleteExperienceService,
};
