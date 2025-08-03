import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { emptyDetailsFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./Spinner.jsx";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

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
  const [editMode, setEditMode] = useState(false);
  const firstInputEl = useRef(null);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptyDetailsFormTemplate);
      setEditMode(true);
      setTimeout(() => {
        if (firstInputEl.current) {
          firstInputEl.current.focus();
        }
      }, 0);
    } else {
      setEditMode(false);
      setFormData({
        ...emptyDetailsFormTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  useEffect(() => {
    if (editMode && firstInputEl.current) {
      firstInputEl.current.focus();
    }
  }, [editMode]);

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
      toast.success("Item saved!");
    } catch (error) {
      console.error("Error saving:", error.message);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setIsFormLoading(true);
      // if (formData._id === "new") return; // Nothing to delete
      try {
        const response = await axios.delete(
          `http://localhost:5555/api/personal-details/${formData._id}`,
          { withCredentials: true }
        );
        onDelete(response.data.details._id);
        setIsFormLoading(false);
        toast.success("Item deleted!");
        console.log("Deleted:", response.data);
      } catch (error) {
        console.error("Error deleting:", error.message);
        toast.error("Something went wrong!");
      }
    }
  };

  const toggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  console.log(editMode);

  if (!activeDocument) return <div className="p-4">No documents</div>;

  return (
    <div className="md:px-4 pb-4">
      <div className="p-4 pt-10 bg-blue-900 md:rounded-bl-2xl">
        <h1 className="text-4xl text-white">Profile</h1>
      </div>
      <div className="md:mt-4 md:rounded-xl p-4 md:px-16  shadow-xl shadow-blue-100 bg-white">
        {isFormLoading && <Spinner />}
        <form
          className="px-1 md:py-4 flex flex-col relative"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center gap-10 mb-16 text-neutral-500">
            {activeDocument._id !== "new" && (
              <div
                className={`flex justify-center items-center flex-col p-2 w-16 h-16 rounded-md cursor-pointer hover:text-blue-700 ${
                  editMode && "bg-neutral-100 text-blue-700"
                }`}
                onClick={toggleEdit}
              >
                <PencilSquareIcon className="w-12 h-12" />
                <span className="text-xs mt-2">Edit</span>
              </div>
            )}

            <button
              className={`flex justify-center items-center flex-col p-2 w-16 h-16 rounded-sm cursor-pointer ${
                editMode && "text-neutral-800 hover:text-blue-700"
              }`}
              type="submit"
              disabled={!editMode}
            >
              <CheckIcon className="w-12 h-12" />
              <span className="text-xs mt-2">Save</span>
            </button>

            {/* <button
              type="submit"
              className="bg-blue-400 mt-10 px-10 py-3 rounded-md text-white cursor-pointer"
            >
              Save
            </button> */}

            {activeDocument._id !== "new" && (
              <div className="flex justify-center items-center flex-col p-2 w-16 h-16 rounded-sm cursor-pointer hover:text-red-500">
                <TrashIcon className="w-12 h-12" onClick={handleDelete} />
                <span className="text-xs mt-2">Delete</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem]">
            <label htmlFor="name">Name</label>
            <input
              className="max-w-sm border border-neutral-200 rounded-sm p-2 py-3 focus:shadow-lg focus:shadow-blue focus:outline-1 focus: outline-blue-300"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!editMode}
              ref={firstInputEl}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem]">
            <label htmlFor="description">Value</label>
            <input
              className="max-w-sm border border-neutral-200 rounded-sm p-2 py-3 focus:shadow-lg focus:shadow-blue focus:outline-1 focus: outline-blue-300"
              type="text"
              name="value"
              id="value"
              value={formData.value}
              onChange={handleChange}
              required
              disabled={!editMode}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
