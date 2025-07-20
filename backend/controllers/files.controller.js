import {
  createFileService,
  updateFileService,
  deleteFileService,
} from "../services/file.service.js";

const createFile = async (req, res, next) => {
  try {
    const fileData = req.body;
    const file = await createFileService(fileData);
    res
      .status(201)
      .json({ details: file, message: "File created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fileData = req.body;
    const updatedFile = await updateFileService(id, fileData);
    res
      .status(200)
      .json({ details: updatedFile, message: "File updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFile = await deleteFileService(id);
    res
      .status(200)
      .json({ details: deletedFile, message: "File deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createFile, updateFile, deleteFile };
