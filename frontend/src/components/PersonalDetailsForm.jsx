import { useState } from "react";
import axios from "axios";

const PersonalDetailsForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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

  return (
    <>
      <form className="flex flex-col p-4" onSubmit={handleSubmit}>
        <div className="flex justify-between mb-5">
          <h1>Personal Details</h1>

          <button className="ml-auto text-red-600 font-bold cursor-pointer">
            DELETE
          </button>
        </div>
        <label htmlFor="name">Name: </label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
        />

        <label htmlFor="value">Value</label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="value"
          id="value"
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
