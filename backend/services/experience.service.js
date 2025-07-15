import Experience from "../model/experience.model.js";
import {
  updateCloudinaryMedia,
  deleteCloudinaryMedia,
} from "./cloudinary/cloudinary.service.js";

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
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new Error("Project not found");
    }

    await updateCloudinaryMedia(
      {
        logoPublicId: experience.logoPublicId,
        iconPublicId: experience.iconPublicId,
      },
      {
        logoPublicId: data.logoPublicId,
        iconPublicId: data.iconPublicId,
      }
    );

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
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new Error("Experience not found");
    }

    await deleteCloudinaryMedia({
      logoPublicId: experience.logoPublicId,
      iconPublicId: experience.iconPublicId,
    });

    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      throw new Error("Experience deletion failed");
    }

    return deletedExperience;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete experience. Please try again.");
  }
};

export {
  createExperienceService,
  updateExperienceService,
  deleteExperienceService,
};
