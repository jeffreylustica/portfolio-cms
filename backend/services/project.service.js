import Project from "../model/projects.model.js";
import updateCloudinaryImage from "./cloudinary/updateCloudinaryImage.js";
import deleteCloudinaryImage from "./cloudinary/deleteCloudinaryImage.js";

const createProjectService = async (data) => {
  try {
    const createdProject = new Project(data);
    const savedProject = await createdProject.save();
    return savedProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project. Please try again.");
  }
};

const updateProjectService = async (id, data) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    await updateCloudinaryImage(project.imagePublicId, data.imagePublicId);

    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProject) {
      throw new Error("Project not found");
    }
    return updatedProject;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update project. Please try again.");
  }
};

const deleteProjectService = async (id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    await deleteCloudinaryImage(project.imagePublicId);

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      throw new Error("Project not found");
    }
    return deletedProject;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again.");
  }
};

export { createProjectService, updateProjectService, deleteProjectService };
