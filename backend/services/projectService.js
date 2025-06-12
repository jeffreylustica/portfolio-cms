import Project from "../model/projects.model.js";

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
    const updatedProject = await Project.findByIdAndUpdate(id, data, {new: true})
    if (!updatedProject) {
      throw new Error("Project not found")
    }
    return updatedProject
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update project. Please try again.")
  }
}

const deleteProjectService = async (id) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
     if (!deletedProject) {
            throw new Error("Project not found")
        }
      return deletedProject;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again.");
  }
}

export { createProjectService, updateProjectService, deleteProjectService };
