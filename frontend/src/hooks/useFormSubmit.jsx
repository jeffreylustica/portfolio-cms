import axios from "axios";
import { toast } from "react-hot-toast";
import uploadSelectedMedia from "../services/uploadSelectedMedia";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const toISO = (date) => (date ? new Date(date).toISOString() : null);

const useFormSubmit = ({
  formData,
  onSave,
  setIsFormLoading,
  endpoint,
  selectedFiles = null,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    const isNew = formData._id === "new";
    const url = isNew
      ? endpoint
      : `${API_BASE_URL}/${endpoint}/${formData._id}`;
    const method = isNew ? "post" : "put";

    try {
      const { _id, ...formDataWithoutId } = formData;
      let payload = { ...formDataWithoutId };
      const uploadedData = selectedFiles
        ? await uploadSelectedMedia(selectedFiles)
        : {};

      Object.entries(uploadedData).forEach(([key, fileData]) => {
        payload[key] = fileData?.imageUrl ?? formData[key];

        const publicIdKey = key.replace(/Url$/, "PublicId");
        payload[publicIdKey] = fileData?.imagePublicId ?? formData[publicIdKey];
      });

      const dateFields = ["startDate", "endDate"];
      dateFields.forEach((field) => {
        if (formData[field]) {
          payload[field] = toISO(formData[field]);
        }
      });

      const response = await axios[method](url, payload, {
        withCredentials: true,
      });

      onSave(response.data.details);
      toast.success("Item saved!");
    } catch (err) {
      if (import.meta.env.MODE === "development") {
        console.error("Submit error:", err.message);
      }

      toast.error("Something went wrong!");
    } finally {
      setIsFormLoading(false);
    }
  };

  return handleSubmit;
};

export default useFormSubmit;
