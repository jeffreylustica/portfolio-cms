const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(201).json({
      url: req.file.path, // Cloudinary image URL
      public_id: req.file.filename, // For future deletion
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { uploadFile };
