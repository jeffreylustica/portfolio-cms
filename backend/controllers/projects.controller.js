import { createProjectService } from "../services/projectService.js";

const createProject = async (req, res, next) => {
  try {
    const projectsData = req.body;
    const project = await createProjectService(projectsData);
    res.status(201).json({
      detail: project,
      message: "project created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createProject };
