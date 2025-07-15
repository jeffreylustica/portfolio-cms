import { useEffect, useState } from "react";
import axios from "axios";
import { emptyExpFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import useMediaUploader from "../hooks/useMediaUploader.jsx";

const ExperienceForm = ({ activeDocument, onSave, onDelete }) => {
  const { formData, setFormData, handleChange } =
    useFormData(emptyExpFormTemplate);

  const { selectedFiles, handleFileChange, uploadMedia } =
    useMediaUploader(setFormData);

  useEffect(() => {
    if (!activeDocument) return;

    const formatDate = (isoString) => {
      if (!isoString) return "";
      return isoString.split("T")[0];
    };

    if (activeDocument._id === "new") {
      setFormData(emptyExpFormTemplate);
    } else {
      setFormData({
        ...emptyExpFormTemplate,
        ...activeDocument,
        startDate: formatDate(activeDocument.startDate),
        endDate: formatDate(activeDocument.endDate),
      });
    }
  }, [activeDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let uploadedFiles = {};

    const toISO = (date) => (date ? new Date(date).toISOString() : null);

    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/experiences"
        : `http://localhost:5555/api/experiences/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      if (selectedFiles) {
        uploadedFiles = await uploadMedia(selectedFiles);
      }
      console.log(uploadedFiles);

      const response = await axios[method](
        url,
        {
          name: formData.name,
          description: formData.description,
          logoUrl: uploadedFiles.logoUrl?.imageUrl || formData.logoUrl,
          logoPublicId:
            uploadedFiles.logoUrl?.imagePublicId || formData.logoPublicId,
          iconUrl: uploadedFiles.iconUrl?.imageUrl || formData.iconUrl,
          iconPublicId:
            uploadedFiles.iconUrl?.imagePublicId || formData.iconPublicId,
          startDate: toISO(formData.startDate),
          endDate: toISO(formData.endDate),
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
        `http://localhost:5555/api/experiences/${formData._id}`,
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
      <h1 className="text-2xl">Experiences</h1>

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

      <label htmlFor="description">Description</label>
      <textarea
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="logoUrl">Logo Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="logoUrl"
        id="logoUrl"
        value={formData.logoUrl}
        required
        readOnly
      />

      <label htmlFor="imageUpload">Upload New Logo</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileChange("logoUrl")}
      />

      {formData.logoUrl && (
        <img
          src={formData.logoUrl}
          alt="Uploaded"
          className="mb-5 w-48 rounded shadow"
        />
      )}

      <label htmlFor="iconUrl">Icon Logo Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="iconUrl"
        id="iconUrl"
        value={formData.iconUrl}
        required
        readOnly
      />

      <label htmlFor="imageUpload">Upload New Icon</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileChange("iconUrl")}
      />

      {formData.iconUrl && (
        <img
          src={formData.iconUrl}
          alt="Uploaded"
          className="mb-5 w-48 rounded shadow"
        />
      )}

      <label htmlFor="startDate">Start Date</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="date"
        name="startDate"
        id="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="endDate">End Date</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="date"
        name="endDate"
        id="endDate"
        value={formData.endDate}
        onChange={handleChange}
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

export default ExperienceForm;
