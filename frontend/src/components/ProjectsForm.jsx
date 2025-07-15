import { useEffect } from "react";
import axios from "axios";
import TagInput from "./ReactTags";
import { emptyProjectFormTemplate } from "../constants/formTemplates.js";
import useMediaUploader from "../hooks/useMediaUploader.jsx";
import useFormData from "../hooks/useFormData.jsx";

const ProjectsForm = ({ activeDocument, onSave, onDelete }) => {
  const { formData, setFormData, handleChange, handleTagChange } = useFormData(
    emptyProjectFormTemplate
  );

  const { selectedFiles, handleFileChange, uploadMedia } =
    useMediaUploader(setFormData);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptyProjectFormTemplate);
    } else {
      setFormData({
        ...emptyProjectFormTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let uploadedFiles = {};

    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/projects"
        : `http://localhost:5555/api/projects/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      if (selectedFiles) {
        uploadedFiles = await uploadMedia(selectedFiles);
      }

      const response = await axios[method](
        url,
        {
          name: formData.name,
          description: formData.description,
          imageUrl: uploadedFiles.imageUrl?.imageUrl || formData.imageUrl,
          imagePublicId:
            uploadedFiles.imageUrl?.imagePublicId || formData.imagePublicId,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          tags: formData.tags,
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
        `http://localhost:5555/api/projects/${formData._id}`,
        { withCredentials: true }
      );

      onDelete(response.data.details._id);
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  if (!activeDocument) return <div className="p-4">No documents</div>;

  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl">Projects</h1>

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
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        className="bg-gray-100 max-w-sm mb-2 outline-0 p-2"
        type="text"
        name="imageUrl"
        id="imageUrl"
        value={formData.imageUrl}
        readOnly
      />

      <label htmlFor="imageUpload">Upload New Image</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileChange("imageUrl")}
      />

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Uploaded"
          className="mb-5 w-48 rounded shadow"
        />
      )}

      <label htmlFor="liveUrl">Live Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="liveUrl"
        id="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        required
      />

      <label htmlFor="githubUrl">Github Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="githubUrl"
        id="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        required
      />

      <label htmlFor="tags">Tags</label>
      <TagInput
        id="tags"
        tags={formData.tags || []}
        handleTagChange={handleTagChange}
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

export default ProjectsForm;
