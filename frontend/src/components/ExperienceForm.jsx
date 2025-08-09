import { useState, useEffect } from "react";
import { emptyExpFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
import { Toaster } from "react-hot-toast";
import FormActions from "./formElements/FormActions.jsx";
import useEditMode from "../hooks/useEditMode.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import FormInput from "./formElements/FormInput.jsx";
import FormTextarea from "./formElements/FormTextArea.jsx";

const ExperienceForm = ({
  activeDocument,
  onSave,
  onDelete,
  isFormLoading,
  setIsFormLoading,
}) => {
  const {
    formData,
    setFormData,
    handleChange,
    selectedFiles,
    handleFileChange,
  } = useFormData(emptyExpFormTemplate);

  const { editMode, setEditMode, firstInputEl } = useEditMode();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!activeDocument) return;

    const formatDate = (isoString) => {
      if (!isoString) return "";
      return isoString.split("T")[0];
    };

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptyExpFormTemplate);
      setEditMode(true);
      setTimeout(() => firstInputEl.current?.focus(), 0);
    } else {
      setIsNew(false);
      setFormData({
        ...activeDocument,
        startDate: formatDate(activeDocument.startDate),
        endDate: formatDate(activeDocument.endDate),
      });
      setEditMode(false);
    }
  }, [activeDocument]);

  const handleSubmit = useFormSubmit({
    formData,
    setIsFormLoading,
    onSave,
    endpoint: "http://localhost:5555/api/experiences",
    selectedFiles, // only if needed
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "http://localhost:5555/api/experiences",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   let uploadedFiles = {};

  //   const toISO = (date) => (date ? new Date(date).toISOString() : null);

  //   const url =
  //     formData._id === "new"
  //       ? "http://localhost:5555/api/experiences"
  //       : `http://localhost:5555/api/experiences/${formData._id}`;

  //   const method = formData._id === "new" ? "post" : "put";

  //   try {
  //     if (selectedFiles) {
  //       uploadedFiles = await uploadMedia(selectedFiles);
  //     }
  //     console.log(uploadedFiles);

  //     const response = await axios[method](
  //       url,
  //       {
  //         name: formData.name,
  //         description: formData.description,
  //         logoUrl: uploadedFiles.logoUrl?.imageUrl || formData.logoUrl,
  //         logoPublicId:
  //           uploadedFiles.logoUrl?.imagePublicId || formData.logoPublicId,
  //         iconUrl: uploadedFiles.iconUrl?.imageUrl || formData.iconUrl,
  //         iconPublicId:
  //           uploadedFiles.iconUrl?.imagePublicId || formData.iconPublicId,
  //         startDate: toISO(formData.startDate),
  //         endDate: toISO(formData.endDate),
  //       },
  //       { withCredentials: true }
  //     );
  //     onSave(response.data.details);
  //     console.log("Saved:", response.data);
  //   } catch (error) {
  //     console.error("Error saving:", error.message);
  //   }
  // };

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   if (formData._id === "new") return; // Nothing to delete

  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:5555/api/experiences/${formData._id}`,
  //       { withCredentials: true }
  //     );
  //     onDelete(response.data.details._id);
  //     console.log("Deleted:", response.data);
  //   } catch (error) {
  //     console.error("Error deleting:", error.message);
  //   }
  // };

  if (!activeDocument)
    return (
      <div className="p-4 min-h-dvh flex justify-center items-center text-2xl text-neutral-400">
        No documents
      </div>
    );

  return (
    <div className="md:px-4 pb-4">
      <Toaster />

      <div className="p-4 pt-10 bg-blue-900 md:rounded-bl-2xl">
        <h1 className="text-4xl text-white">Projects</h1>
      </div>
      <div className="md:mt-4 md:rounded-xl p-4 md:px-16  shadow-xl shadow-blue-100 bg-white">
        {isFormLoading && <Spinner />}
        <form
          className="px-1 md:py-4 flex flex-col relative"
          onSubmit={handleSubmit}
        >
          <FormActions
            isNew={isNew}
            editMode={editMode}
            setEditMode={setEditMode}
            handleDelete={handleDelete}
          />

          <FormInput
            label="Name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!editMode}
            inputRef={firstInputEl}
          />

          {/* <label htmlFor="name">Name</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          /> */}

          <FormTextarea
            label="Description"
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={!editMode}
          />

          {/* <label htmlFor="description">Description</label>
          <textarea
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          /> */}

          <FormInput
            label="Logo Url"
            type="text"
            name="logoUrl"
            id="logoUrl"
            value={formData.logoUrl}
            required
            readOnly
            hidden
          />

          {/* <label htmlFor="logoUrl">Logo Url</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="text"
            name="logoUrl"
            id="logoUrl"
            value={formData.logoUrl}
            required
            readOnly
          /> */}

          <FormInput
            label="Upload Logo"
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange("logoUrl")}
            disabled={!editMode}
            accept="image/*"
          />

          {/* <label htmlFor="imageUpload">Upload Logo</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange("logoUrl")}
          /> */}

          {formData.logoUrl && (
            <div className="grid grid-cols-[100px_1fr] items-center mb-4">
              <div></div>
              <img
                src={formData.logoUrl}
                alt="Uploaded"
                className="max-w-sm w-full max-h-[200px] object-contain border border-neutral-200"
              />
            </div>
          )}

          {/* {formData.logoUrl && (
            <img
              src={formData.logoUrl}
              alt="Uploaded"
              className="mb-5 w-48 rounded shadow"
            />
          )} */}

          <FormInput
            label="Icon Url"
            type="text"
            name="iconUrl"
            id="iconUrl"
            value={formData.iconUrl}
            required
            readOnly
            hidden
          />

          {/* <label htmlFor="iconUrl">Icon Url</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="text"
            name="iconUrl"
            id="iconUrl"
            value={formData.iconUrl}
            required
            readOnly
          /> */}

          <FormInput
            label="Upload Icon"
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange("iconUrl")}
            disabled={!editMode}
            accept="image/*"
          />

          {/* <label htmlFor="imageUpload">Upload Icon</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange("iconUrl")}
          /> */}

          {formData.iconUrl && (
            <div className="grid grid-cols-[100px_1fr] items-center mb-4">
              <div></div>
              <img
                src={formData.iconUrl}
                alt="Uploaded"
                className="max-w-sm w-full max-h-[200px] object-contain border border-neutral-200"
              />
            </div>
          )}

          {/* {formData.iconUrl && (
            <img
              src={formData.iconUrl}
              alt="Uploaded"
              className="mb-5 w-48 rounded shadow"
            />
          )} */}

          <FormInput
            label="Start Date"
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            disabled={!editMode}
          />

          {/* <label htmlFor="startDate">Start Date</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          /> */}

          <FormInput
            label="End Date"
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={!editMode}
          />

          {/* <label htmlFor="endDate">End Date</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
          /> */}
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
