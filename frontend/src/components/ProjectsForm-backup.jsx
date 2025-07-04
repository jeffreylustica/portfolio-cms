import { useEffect, useState } from "react";
import axios from "axios";
import TagInput from "./ReactTags";

const emptyFormDataTemplate = {
  _id: "new",
  name: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  tags: [],
};

const ProjectsForm = ({ activeDocument, onSave, onDelete }) => {
  const [formData, setFormData] = useState(emptyFormDataTemplate);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptyFormDataTemplate);
    } else {
      setFormData({
        ...emptyFormDataTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/projects"
        : `http://localhost:5555/api/projects/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      const response = await axios[method](
        url,
        {
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          tags: formData.tags,
        },
        { withCredentials: true }
      );

      onSave(response.data.details)
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

      onDelete(response.data.details._id)
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  const handleTagChange = (tags) => {
    setFormData((prev) => ({
      ...prev,
      tags: tags, // Keep tags as objects with id and text
    }));
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

      <label htmlFor="imageUrl">Image Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="imageUrl"
        id="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />

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
