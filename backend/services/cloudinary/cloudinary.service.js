import { v2 as cloudinary } from "cloudinary";

const updateCloudinaryMedia = async (
  existingPublicIds = {},
  newPublicIds = {}
) => {
  const fields = Object.keys(newPublicIds);

  for (const field of fields) {
    const oldId = existingPublicIds[field];
    const newId = newPublicIds[field];

    const isNewFileUploaded = newId && newId !== oldId;

    if (isNewFileUploaded && oldId) {
      try {
        await cloudinary.uploader.destroy(oldId);
      } catch (err) {
        console.error(
          `Failed to delete ${field} from Cloudinary:`,
          err.message
        );
      }
    }
  }
};

const deleteCloudinaryMedia = async (publicIds = {}) => {
  const ids = Object.values(publicIds).filter(Boolean); // Filter out null/undefined

  for (const publicId of ids) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error("Cloudinary deletion failed:", err.message);
    }
  }
};

export { updateCloudinaryMedia, deleteCloudinaryMedia };
