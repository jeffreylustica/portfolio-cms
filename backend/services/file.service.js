import File from "../model/file.model.js";

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

export { createFileService };
