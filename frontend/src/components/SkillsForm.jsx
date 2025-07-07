import { useEffect, useState } from "react";
import axios from "axios";
import { emptySkillFormTemplate } from "../constant/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import useMediaUploader from "../hooks/useMediaUploader.jsx";

const SkillsForm = ({ activeDocument, onSave, onDelete }) => {
  const { formData, setFormData, handleChange } = useFormData(
    emptySkillFormTemplate
  );

  const { selectedFile, handleFileChange, uploadMedia } =
    useMediaUploader(setFormData);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptySkillFormTemplate);
    } else {
      setFormData({
        ...emptySkillFormTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let uploadedFile = null;

    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/skills"
        : `http://localhost:5555/api/skills/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      if (selectedFile) {
        uploadedFile = await uploadMedia(selectedFile);
      }

      const response = await axios[method](
        url,
        {
          name: formData.name,
          imageUrl: uploadedFile?.imageUrl || formData.imageUrl,
          imagePublicId: uploadedFile?.imagePublicId || formData.imagePublicId,
        },
        { withCredentials: true }
      );

      onSave(response.data.details);
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
        `http://localhost:5555/api/skills/${formData._id}`,
        { withCredentials: true }
      );

      onDelete(response.data.details._id);
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  if (!activeDocument) return <div className="p-4">Loading skills...</div>;

  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl">Skills</h1>

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

      <label htmlFor="imageUrl">Image Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="imageUrl"
        id="imageUrl"
        value={formData.imageUrl}
        required
        readOnly
      />

      <label htmlFor="imageUpload">Upload New Image</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileChange}
      />

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Uploaded"
          className="mb-5 w-48 rounded shadow"
        />
      )}

      <button
        type="submit"
        className="bg-blue-400 mr-auto px-10 py-4 font-bold text-white cursor-pointer"
      >
        SAVE
      </button>
    </form>
  );
};

export default SkillsForm;
