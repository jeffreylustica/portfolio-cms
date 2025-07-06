import axios from "axios";

const uploadFile = async (file) => {
  if (!file) return;

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);

  try {
    const res = await axios.post(
      "http://localhost:5555/api/upload",
      formDataUpload,
      { withCredentials: true }
    );

    return {
      imageUrl: res.data.url,
      imagePublicId: res.data.public_id,
    };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};

export default uploadFile;
