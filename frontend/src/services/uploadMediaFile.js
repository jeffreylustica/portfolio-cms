import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const uploadMediaFile = async (file) => {
  if (!file) return;

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);

  try {
    const res = await axios.post(`${API_BASE_URL}/api/upload`, formDataUpload, {
      withCredentials: true,
    });

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
