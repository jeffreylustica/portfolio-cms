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
      let uploadedData = {};

      // optional file upload
      // if (uploadMedia && selectedFiles) {
      if (selectedFiles) {
        uploadedData = await uploadSelectedMedia(selectedFiles);
      }

      console.log(uploadedData);

      // let the form build its own payload
      const payload = buildPayload(formData, uploadedData);

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
