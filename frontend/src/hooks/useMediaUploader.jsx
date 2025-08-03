import { useState } from "react";
import uploadFile from "../services/uploadMediaFile.js";

const useMediaUploader = (setFormData) => {
  // const [selectedFiles, setSelectedFiles] = useState({});

  // const handleFileChange = (fieldName) => (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setSelectedFiles((prev) => ({ ...prev, [fieldName]: file }));

  //   const tempUrl = URL.createObjectURL(file);
  //   setFormData((prev) => ({
  //     ...prev,
  //     [fieldName]: tempUrl,
  //   }));
  // };

  const uploadMedia = async () => {
    const uploads = {};

    for (const [field, file] of Object.entries(selectedFiles)) {
      if (file) {
        const uploaded = await uploadFile(file);
        uploads[field] = uploaded;
      }
    }

    return uploads;
  };

  return {
    selectedFiles,
    handleFileChange,
    uploadMedia,
  };
};

export default useMediaUploader;
