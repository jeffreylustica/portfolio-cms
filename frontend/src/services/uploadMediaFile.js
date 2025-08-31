import api from "../utils/api";

const uploadMediaFile = async (file) => {
  if (!file) return;

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);

  try {
    const res = await api.post(`/api/upload`, formDataUpload);

    return {
      imageUrl: res.data.url,
      imagePublicId: res.data.public_id,
    };
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Image upload failed:", error);
    }

    throw new Error("Image upload failed. Please try again.");
  }
};

export default uploadMediaFile;
