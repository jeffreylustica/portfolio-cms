import { v2 as cloudinary } from "cloudinary";

const updateCloudinaryMedia = async (existingPublicId, newPublicId) => {
  const isNewImageUploaded = newPublicId && newPublicId !== existingPublicId;

  if (isNewImageUploaded) {
    try {
      await cloudinary.uploader.destroy(existingPublicId);
    } catch (err) {
      console.error("Cloudinary deletion failed:", err.message);
    }
  }
};

const deleteCloudinaryMedia = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary deletion failed:", err.message);
  }
};

export { updateCloudinaryMedia, deleteCloudinaryMedia };
