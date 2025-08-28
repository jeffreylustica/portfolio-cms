import { useState, useEffect } from "react";
import { emptyDetailsFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
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
      setFormData({ ...activeDocument });
      setEditMode(false);
    }
  }, [activeDocument]);

  const handleSubmit = useFormSubmit({
    formData,
    setIsFormLoading,
    onSave,
    endpoint: "api/personal-details",
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "api/personal-details",
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
        <h1 className="text-4xl text-white text-center md:text-left">
          Profile
        </h1>
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
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
