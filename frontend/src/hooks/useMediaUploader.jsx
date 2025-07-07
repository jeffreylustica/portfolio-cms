import { useState } from "react";
import uploadFile from "../utils/uploadFile.js";

const useMediaUploader = (setFormData) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const tempUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageUrl: tempUrl,
    }));
  };

  const uploadMedia = async () => {
    if (!selectedFile) return null;
    return await uploadFile(selectedFile);
  };

  return { selectedFile, handleFileChange, uploadMedia };
};

export default useMediaUploader;
