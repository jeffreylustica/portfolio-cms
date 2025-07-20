import { useEffect } from "react";
import axios from "axios";
import { emptyDetailsFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./Spinner.jsx";

const PersonalDetailsForm = ({
  activeDocument,
  onSave,
  onDelete,
  isFormLoading,
  setIsFormLoading,
}) => {
  const { formData, setFormData, handleChange } = useFormData(
    emptyDetailsFormTemplate
  );

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptyDetailsFormTemplate);
    } else {
      setFormData({
        ...emptyDetailsFormTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);
    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/personal-details"
        : `http://localhost:5555/api/personal-details/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      const response = await axios[method](
        url,
        {
          name: formData.name,
          value: formData.value,
        },
        { withCredentials: true }
      );

      onSave(response.data.details);
      setIsFormLoading(false);

      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Error saving:", error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData._id === "new") return; // Nothing to delete

    try {
      const response = await axios.delete(
        `http://localhost:5555/api/personal-details/${formData._id}`,
        { withCredentials: true }
      );
      onDelete(response.data.details._id);
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  if (!activeDocument) return <div className="p-4">Loading project...</div>;

  return (
    <form className="flex flex-col p-4 relative" onSubmit={handleSubmit}>
      {isFormLoading && <Spinner />}
      <h1 className="text-2xl">Personal Details</h1>

      <div className="flex justify-between mb-5">
        <button
          type="button"
          onClick={handleDelete}
          className="ml-auto text-red-500 hover:text-red-600 font-bold cursor-pointer"
        >
          DELETE ITEM
        </button>
      </div>

      <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Value</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="value"
        id="value"
        value={formData.value}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-blue-400 mr-auto px-10 py-4 font-bold text-white cursor-pointer"
      >
        SAVE
      </button>
    </form>
  );
};

export default PersonalDetailsForm;
