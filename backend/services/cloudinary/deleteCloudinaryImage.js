import { v2 as cloudinary } from "cloudinary";

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary deletion failed:", err.message);
  }
};

export default deleteCloudinaryImage;
