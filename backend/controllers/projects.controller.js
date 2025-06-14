import { createProjectService, deleteProjectService, updateProjectService } from "../services/project.service.js";

const createProject = async (req, res, next) => {
  try {
    const projectsData = req.body;
    const project = await createProjectService(projectsData);
    res.status(201).json({
      details: project,
      message: "Project created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res, next) => {
  try {
    const {id} = req.params
    const projectData = req.body
    const updatedProject = await updateProjectService(id, projectData)
    res.status(200).json({details: updatedProject, message:"Project updated successfully!"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

const deleteProject =  async (req, res, next) => {
  try {
    const {id} = req.params
    const deletedProject = await deleteProjectService(id);
    res.status(200).json({details: deletedProject, message: "Project deleted successfully!"});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

export { createProject, updateProject, deleteProject };
