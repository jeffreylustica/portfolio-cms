import Project from "../model/projects.model.js";

const createProjectService = async (data) => {
  try {
    // const {name, description, previewImage, liveUrl, githubUrl, tags} = data;
    const createdProject = new Project(data);
    const savedProject = await createdProject.save();
    return savedProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create personal detail. Please try again.");
  }
};

export { createProjectService };
