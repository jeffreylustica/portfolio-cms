import Skill from "../model/skills.model.js";
import {
  updateCloudinaryMedia,
  deleteCloudinaryMedia,
} from "./cloudinary/cloudinary.service.js";

const createSkillService = async (data) => {
  try {
    const createdSkill = new Skill(data);
    const savedSkill = await createdSkill.save();
    return savedSkill;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw new Error("Failed to create skill. Please try again.");
  }
};

const updateSkillService = async (id, data) => {
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      throw new Error("Skill not found");
    }

    await updateCloudinaryMedia(
      { imagePublicId: skill.imagePublicId },
      { imagePublicId: data.imagePublicId }
    );

    const updatedSkill = await Skill.findByIdAndUpdate(id, data, { new: true });
    if (!updatedSkill) {
      throw new Error("Skill not found");
    }
    return updatedSkill;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw new Error("Failed to update skill. Please try again.");
  }
};

const deleteSkillService = async (id) => {
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      throw new Error("Skill not found");
    }

    await deleteCloudinaryMedia({ imagePublicId: skill.imagePublicId });

    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      throw new Error("Skill not found");
    }
    return deletedSkill;
  } catch (error) {
    console.error("Error deleting skill", error);
    throw new Error("Failed to delete skill. Please try again.");
  }
};

export { createSkillService, updateSkillService, deleteSkillService };
