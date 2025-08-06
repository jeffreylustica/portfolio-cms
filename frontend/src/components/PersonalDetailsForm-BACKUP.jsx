import GenericForm from "./GenericForm.jsx";
import { emptyProjectFormTemplate } from "../constants/formTemplates.js";
import FormInput from "./FormInput.jsx";
// import FormTextarea from "./FormTextArea.jsx";
// import FormFieldWrapper from "./FormFieldWrapper.jsx";
// import TagInput from "./ReactTags";

const ProjectsForm = ({
  activeDocument,
  onSave,
  onDelete,
  isFormLoading,
  setIsFormLoading,
}) => {
  return (
    <GenericForm
      title="Projects"
      endpoint="http://localhost:5555/api/personal-details"
      emptyFormTemplate={emptyProjectFormTemplate}
      activeDocument={activeDocument}
      onSave={onSave}
      onDelete={onDelete}
      isFormLoading={isFormLoading}
      setIsFormLoading={setIsFormLoading}
      renderFields={({
        formData,
        handleChange,
        handleTagChange,
        handleFileChange,
        editMode,
        firstInputEl,
      }) => (
        <>
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
        </>
      )}
    />
  );
};

export default ProjectsForm;
