import { useState } from "react";

const useImageUploader = (formData, setFormData) => {
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

  return { selectedFile, handleFileChange };
};

export default useImageUploader;
