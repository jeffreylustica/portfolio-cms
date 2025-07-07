import { useState } from "react";

const useFormData = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tags) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleTagChange,
  };
};

export default useFormData;
