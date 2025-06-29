import express from 'express';
import { upload } from '../utils/multer.js';

const uploadsRouter = express.Router();

uploadsRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    url: req.file.path,         // Cloudinary image URL
    public_id: req.file.filename // For future deletion
  });
});

export default uploadsRouter;
