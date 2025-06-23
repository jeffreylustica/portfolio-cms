import { useEffect, useState } from "react";
import axios from "axios";

const emptyProjectTemplate = {
  _id: "new",
  name: "",
  description: "",
  logoUrl: "",
  iconLogoUrl: "",
  startDate: "",
  endDate: "",
};

const ExperienceForm = ({ activeDocument }) => {
  const [formData, setFormData] = useState(emptyProjectTemplate);

  useEffect(() => {
    if (!activeDocument) return;

    const formatDate = (isoString) => {
      if (!isoString) return "";
      return isoString.split("T")[0];
    };

    if (activeDocument._id === "new") {
      setFormData(emptyProjectTemplate);
    } else {
      setFormData({
        ...emptyProjectTemplate,
        ...activeDocument,
        startDate: formatDate(activeDocument.startDate),
        endDate: formatDate(activeDocument.endDate),
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

    const toISO = (date) => (date ? new Date(date).toISOString() : null);

    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/experiences"
        : `http://localhost:5555/api/experiences/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      const response = await axios[method](
        url,
        {
          name: formData.name,
          description: formData.description,
          logoUrl: formData.logoUrl,
          iconLogoUrl: formData.iconLogoUrl,
          startDate: toISO(formData.startDate),
          endDate: toISO(formData.endDate),
        },
        { withCredentials: true }
      );

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
        onChange={handleChange}
        required
      />

      <label htmlFor="iconLogoUrl">Icon Logo Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="iconLogoUrl"
        id="iconLogoUrl"
        value={formData.iconLogoUrl}
        onChange={handleChange}
        required
      />

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
