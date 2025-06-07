import { useEffect, useState } from "react";
import axios from "axios";

const PersonalDetailsForm = ({ activeDocument }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (activeDocument) {
      const documentId = activeDocument._id;
      if (documentId === "new") {
        setFormData({ _id: documentId, name: "", value: "" });
      } else {
        const { _id, name, value } = activeDocument;
        setFormData({ _id, name, value });
      }
    }
  }, [activeDocument]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5555/api/personal-details",
        {
          name: formData.name,
          value: formData.value,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5555/api/personal-details/${formData._id}`,
        {
          name: formData.name,
          value: formData.value,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    if (formData._id === "new") {
      handleSubmitNew(e);
    } else {
      handleSubmitUpdate(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/personal-details/${formData._id}`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form className="flex flex-col p-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Personal Details</h1>
        <div className="flex justify-between mb-5">
          <button
            className="ml-auto text-red-500 hover:text-red-600 font-bold cursor-pointer"
            onClick={handleDelete}
          >
            DELETE ITEM
          </button>
        </div>
        <label htmlFor="name">Name: </label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="name"
          id="name"
          value={formData.name || ""}
          required
          onChange={handleChange}
        />

        <label htmlFor="value">Value</label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="value"
          id="value"
          value={formData.value || ""}
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-400 mr-auto px-10 py-4 font-bold text-white cursor-pointer"
        >
          SAVE
        </button>
      </form>
    </>
  );
};

export default PersonalDetailsForm;
