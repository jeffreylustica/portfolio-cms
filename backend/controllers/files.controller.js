import { createFileService } from "../services/file.service.js";

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

export { createFile };
