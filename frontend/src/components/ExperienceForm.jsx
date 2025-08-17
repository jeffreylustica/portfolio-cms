import { useState, useEffect } from "react";
import { emptyExpFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
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
    endpoint: "api/experiences",
    selectedFiles, // only if needed
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "api/experiences",
  });

  if (!activeDocument)
    return (
      <div className="p-4 min-h-dvh flex justify-center items-center text-2xl text-neutral-400">
        No documents
      </div>
    );

  return (
    <div className="md:px-4 pb-4">
      <div className="p-4 pt-10 bg-blue-900 md:rounded-bl-2xl">
        <h1 className="text-4xl text-white">Experience</h1>
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

          <FormInput
            label="Upload Logo"
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange("logoUrl")}
            disabled={!editMode}
            accept="image/*"
          />

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

          <FormInput
            label="Upload Icon"
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange("iconUrl")}
            disabled={!editMode}
            accept="image/*"
          />

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

          <FormInput
            label="End Date"
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={!editMode}
          />
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
