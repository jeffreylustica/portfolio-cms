import axios from "axios";
import { toast } from "react-hot-toast";
import uploadSelectedMedia from "../services/uploadSelectedMedia";

const useFormSubmit = ({
  formData,
  onSave,
  setIsFormLoading,
  endpoint,
  // uploadMedia = null,
  selectedFiles = null,
  buildPayload,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    const isNew = formData._id === "new";
    const url = isNew ? endpoint : `${endpoint}/${formData._id}`;
    const method = isNew ? "post" : "put";

    try {
      // 1. Remove _id from form data
      const { _id, ...formDataWithoutId } = formData;

      // 2. Start with base payload
      let payload = { ...formDataWithoutId };

      // 3. Upload media if files are provided
      const uploadedData = selectedFiles
        ? await uploadSelectedMedia(selectedFiles)
        : {};

      // 4. Merge uploaded media into the payload
      Object.entries(uploadedData).forEach(([key, fileData]) => {
        payload[key] = fileData?.imageUrl ?? formData[key];

        const publicIdKey = key.replace(/Url$/, "PublicId");
        payload[publicIdKey] = fileData?.imagePublicId ?? formData[publicIdKey];
      });

      const response = await axios[method](url, payload, {
        withCredentials: true,
      });

      onSave(response.data.details);
      toast.success("Item saved!");
    } catch (err) {
      console.error("Submit error:", err.message);
      toast.error("Something went wrong!");
    } finally {
      setIsFormLoading(false);
    }
  };

  return handleSubmit;
};

export default useFormSubmit;
