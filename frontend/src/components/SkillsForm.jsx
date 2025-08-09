import { useState, useEffect } from "react";
import { emptySkillFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./ui/Spinner.jsx";
import { Toaster } from "react-hot-toast";
import FormActions from "./formElements/FormActions.jsx";
import useEditMode from "../hooks/useEditMode.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import FormInput from "./formElements/FormInput.jsx";

const SkillsForm = ({
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
  } = useFormData(emptySkillFormTemplate);

  const { editMode, setEditMode, firstInputEl } = useEditMode();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptySkillFormTemplate);
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
    endpoint: "http://localhost:5555/api/skills",
    selectedFiles, // only if needed
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "http://localhost:5555/api/skills",
  });

  // useEffect(() => {
  //   if (!activeDocument) return;

  //   if (activeDocument._id === "new") {
  //     setFormData(emptySkillFormTemplate);
  //   } else {
  //     setFormData({
  //       ...emptySkillFormTemplate,
  //       ...activeDocument,
  //     });
  //   }
  // }, [activeDocument]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let uploadedFiles = null;

  //   const url =
  //     formData._id === "new"
  //       ? "http://localhost:5555/api/skills"
  //       : `http://localhost:5555/api/skills/${formData._id}`;

  //   const method = formData._id === "new" ? "post" : "put";

  //   try {
  //     if (selectedFiles) {
  //       uploadedFiles = await uploadMedia(selectedFiles);
  //     }

  //     const response = await axios[method](
  //       url,
  //       {
  //         name: formData.name,
  //         imageUrl: uploadedFiles.imageUrl?.imageUrl || formData.imageUrl,
  //         imagePublicId:
  //           uploadedFiles.imageUrl?.imagePublicId || formData.imagePublicId,
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
  //       `http://localhost:5555/api/skills/${formData._id}`,
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
        <h1 className="text-4xl text-white">Skills</h1>
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

          <FormInput
            label="Image Url"
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            required
            disabled={!editMode}
            readOnly
            hidden
          />

          {/* <label htmlFor="imageUrl">Image Url</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            required
            readOnly
          /> */}

          <FormInput
            label="Upload Image"
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange("imageUrl")}
            disabled={!editMode}
            accept="image/*"
          />

          {/* <label htmlFor="imageUpload">Upload New Image</label>
          <input
            className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange("imageUrl")}
          /> */}

          {formData.imageUrl && (
            <div className="grid grid-cols-[100px_1fr] items-center mb-4">
              <div></div>
              <img
                src={formData.imageUrl}
                alt="Uploaded"
                className="max-w-sm w-full max-h-[200px] object-contain border border-neutral-200"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
