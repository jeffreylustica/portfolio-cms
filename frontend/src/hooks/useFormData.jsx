import { useState } from "react";

const useFormData = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tags) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFiles((prev) => ({ ...prev, [fieldName]: file }));

    const tempUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: tempUrl,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleTagChange,
    selectedFiles,
    handleFileChange,
  };
};

export default useFormData;
