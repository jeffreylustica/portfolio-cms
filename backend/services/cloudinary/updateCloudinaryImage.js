import { v2 as cloudinary } from "cloudinary";

const updateCloudinaryImage = async (existingPublicId, newPublicId) => {
  const isNewImageUploaded = newPublicId && newPublicId !== existingPublicId;

  if (isNewImageUploaded) {
    try {
      await cloudinary.uploader.destroy(existingPublicId);
    } catch (err) {
      console.error("Cloudinary deletion failed:", err.message);
    }
  }
};

export default updateCloudinaryImage;
