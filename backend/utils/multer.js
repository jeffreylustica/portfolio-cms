import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "svg", "pdf"],
    resource_type: "auto", // Let Cloudinary auto-detect image/pdf/raw
  },
});

const upload = multer({ storage });

export { upload };
