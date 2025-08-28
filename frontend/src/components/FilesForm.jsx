import { useState, useEffect } from "react";
import { emptyFileFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
import FormActions from "./formElements/FormActions.jsx";
import useEditMode from "../hooks/useEditMode.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import FormInput from "./formElements/FormInput.jsx";

const FilesForm = ({
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
  } = useFormData(emptyFileFormTemplate);

  const { editMode, setEditMode, firstInputEl } = useEditMode();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptyFileFormTemplate);
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
    endpoint: "api/files",
    selectedFiles,
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "api/files",
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
        <h1 className="text-4xl text-white text-center md:text-left">File</h1>
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
            label="File Url"
            type="text"
            name="fileUrl"
            id="fileUrl"
            value={formData.fileUrl}
            required
            disabled={!editMode}
            readOnly
            hidden
          />

          <FormInput
            label="Upload File"
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={handleFileChange("fileUrl")}
            disabled={!editMode}
            accept="image/*,application/pdf"
            required
          />

          {formData.fileUrl && (
            <div className="grid grid-cols-[100px_1fr] items-center mb-4">
              <div></div>
              <iframe
                src={formData.fileUrl}
                width="100%"
                height="600"
                className="mb-5 rounded shadow"
                title="PDF preview"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FilesForm;
