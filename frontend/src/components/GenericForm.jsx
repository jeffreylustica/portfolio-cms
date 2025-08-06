// GenericForm.jsx
import Spinner from "./Spinner.jsx";
import { Toaster } from "react-hot-toast";
import FormActions from "./FormActions.jsx";
import useFormControls from "../hooks/useFormControls.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import useFormData from "../hooks/useFormData.jsx";

const GenericForm = ({
  title,
  endpoint,
  emptyFormTemplate,
  activeDocument,
  onSave,
  onDelete,
  isFormLoading,
  setIsFormLoading,
  renderFields, // Function: (formData, handleChange, editMode, firstInputEl, others...) => JSX
}) => {
  const {
    formData,
    setFormData,
    handleChange,
    selectedFiles,
    handleFileChange,
    handleTagChange,
  } = useFormData(emptyFormTemplate);

  const { isNew, editMode, setEditMode, firstInputEl } = useFormControls({
    activeDocument,
    emptyFormTemplate,
    setFormData,
  });

  const handleSubmit = useFormSubmit({
    formData,
    setIsFormLoading,
    onSave,
    endpoint,
    selectedFiles,
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint,
  });

  if (!activeDocument) {
    return (
      <div className="p-4 min-h-dvh flex justify-center items-center text-2xl text-neutral-400">
        No documents
      </div>
    );
  }

  return (
    <div className="md:px-4 pb-4">
      <Toaster />
      <div className="p-4 pt-10 bg-blue-900 md:rounded-bl-2xl">
        <h1 className="text-4xl text-white">{title}</h1>
      </div>
      <div className="md:mt-4 md:rounded-xl p-4 md:px-16 shadow-xl shadow-blue-100 bg-white">
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

          {renderFields({
            formData,
            handleChange,
            handleTagChange,
            handleFileChange,
            editMode,
            firstInputEl,
          })}
        </form>
      </div>
    </div>
  );
};

export default GenericForm;
