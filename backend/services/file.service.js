import File from "../model/file.model.js";
import {
  updateCloudinaryMedia,
  deleteCloudinaryMedia,
} from "./cloudinary/cloudinary.service.js";

const createFileService = async (data) => {
  try {
    const createdFile = new File(data);
    const savedFile = await createdFile.save();
    return savedFile;
  } catch (error) {
    console.error("Error creating file:", error);
    throw new Error("Failed to create file. Please try again.");
  }
};

const updateFileService = async (id, data) => {
  try {
    const file = await File.findById(id);
    if (!file) {
      throw new Error("File not found");
    }

    await updateCloudinaryMedia(
      { filePublicId: file.filePublicId },
      { filePublicId: data.filePublicId }
    );

    const updatedFile = await File.findByIdAndUpdate(id, data, { new: true });

    if (!updatedFile) {
      throw new Error("File not found");
    }
    return updatedFile;
  } catch (error) {
    console.error("Error updating file:", error);
    throw new Error("Failed to update file. Please try again.");
  }
};

const deleteFileService = async (id) => {
  try {
    const file = await File.findById(id);
    if (!file) {
      throw new Error("File not found");
    }

    await deleteCloudinaryMedia({ filePublicId: file.filePublicId });

    const deletedFile = await File.findByIdAndDelete(id);
    if (!deletedFile) {
      throw new Error("File not found");
    }
    return deletedFile;
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export { createFileService, updateFileService, deleteFileService };
