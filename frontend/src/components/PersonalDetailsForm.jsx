import { useState, useEffect } from "react";
import { emptyDetailsFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
import { Toaster } from "react-hot-toast";
import FormActions from "./formElements/FormActions.jsx";
import useEditMode from "../hooks/useEditMode.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import FormInput from "./formElements/FormInput.jsx";

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
  const { editMode, setEditMode, firstInputEl } = useEditMode();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptyDetailsFormTemplate);
      setEditMode(true);
      setTimeout(() => firstInputEl.current?.focus(), 0);
    } else {
      setIsNew(false);
      // setFormData({ ...emptyFormTemplate, ...activeDocument });
      setFormData({ ...activeDocument });
      setEditMode(false);
    }
  }, [activeDocument]);

  const handleSubmit = useFormSubmit({
    formData,
    setIsFormLoading,
    onSave,
    endpoint: "http://localhost:5555/api/personal-details",
    // uploadMedia, // only if needed
    // selectedFiles, // only if needed
    // buildPayload: (formData, uploadedFiles) => ({
    // buildPayload: (formData) => ({
    //   name: formData.name,
    //   value: formData.value,
    // imageUrl: uploadedFiles.imageUrl?.imageUrl || formData.imageUrl,
    // imagePublicId:
    //   uploadedFiles.imageUrl?.imagePublicId || formData.imagePublicId,
    // liveUrl: formData.liveUrl,
    // githubUrl: formData.githubUrl,
    // tags: formData.tags,
    // }),
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "http://localhost:5555/api/personal-details",
  });

  // throw new Error("intentional error");

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
        <h1 className="text-4xl text-white">Profile</h1>
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

          <FormInput
            label="Value"
            type="text"
            name="value"
            id="value"
            value={formData.value}
            onChange={handleChange}
            required
            disabled={!editMode}
          />

          {/* <div className="grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem]">
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
          </div> */}
          {/* <div className="grid grid-cols-[100px_1fr] items-center mb-4 text-[.9rem]">
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
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
