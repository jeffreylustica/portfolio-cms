import { useState, useEffect } from "react";
import { emptyProjectFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import Spinner from "./Spinner.jsx";
import { Toaster } from "react-hot-toast";
import FormActions from "./FormActions.jsx";
import useEditMode from "../hooks/useEditMode.jsx";
import useFormSubmit from "../hooks/useFormSubmit.jsx";
import useFormDelete from "../hooks/useFormDelete.jsx";
import TagInput from "./ReactTags";
import FormInput from "./FormInput.jsx";
import FormTextarea from "./FormTextArea.jsx";
import FormFieldWrapper from "./FormFieldWrapper.jsx";

const ProjectsForm = ({
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
    handleTagChange,
    selectedFiles,
    handleFileChange,
  } = useFormData(emptyProjectFormTemplate);
  const { editMode, setEditMode, firstInputEl } = useEditMode();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptyProjectFormTemplate);
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
    endpoint: "http://localhost:5555/api/projects",
    // uploadMedia, // only if needed
    selectedFiles, // only if needed
    // buildPayload: (formData, uploadedFiles) => ({
    //   name: formData.name,
    //   description: formData.description,
    //   imageUrl: uploadedFiles.imageUrl?.imageUrl || formData.imageUrl,
    //   imagePublicId:
    //     uploadedFiles.imageUrl?.imagePublicId || formData.imagePublicId,
    //   liveUrl: formData.liveUrl,
    //   githubUrl: formData.githubUrl,
    //   tags: formData.tags,
    // }),
  });

  const handleDelete = useFormDelete({
    formData,
    onDelete,
    setIsFormLoading,
    endpoint: "http://localhost:5555/api/projects",
  });

  // useEffect(() => {
  //   if (!activeDocument) return;

  //   if (activeDocument._id === "new") {
  //     setFormData(emptyProjectFormTemplate);
  //   } else {
  //     setFormData({
  //       ...emptyProjectFormTemplate,
  //       ...activeDocument,
  //     });
  //   }
  // }, [activeDocument]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   let uploadedFiles = {};

  //   const url =
  //     formData._id === "new"
  //       ? "http://localhost:5555/api/projects"
  //       : `http://localhost:5555/api/projects/${formData._id}`;

  //   const method = formData._id === "new" ? "post" : "put";

  //   try {
  //     if (selectedFiles) {
  //       uploadedFiles = await uploadMedia(selectedFiles);
  //     }

  //     const response = await axios[method](
  //       url,
  //       {
  //         name: formData.name,
  //         description: formData.description,
  //         imageUrl: uploadedFiles.imageUrl?.imageUrl || formData.imageUrl,
  //         imagePublicId:
  //           uploadedFiles.imageUrl?.imagePublicId || formData.imagePublicId,
  //         liveUrl: formData.liveUrl,
  //         githubUrl: formData.githubUrl,
  //         tags: formData.tags,
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
  //       `http://localhost:5555/api/projects/${formData._id}`,
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

          {/* <label htmlFor="imageUrl">Image URL</label>
            <input
            className="bg-gray-100 max-w-sm mb-2 outline-0 p-2"
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            readOnly
            /> */}
          <FormInput
            label="Image URL"
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            required
            readOnly
          />

          {/* <label htmlFor="imageUpload">Upload Image</label>
          <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange("imageUrl")}
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

          {formData.imageUrl && (
            <div className="grid grid-cols-[100px_1fr] items-center mb-4">
              <div></div>
              <img
                src={formData.imageUrl}
                alt="Uploaded"
                className="max-w-sm w-full max-h-[200px] object-contain"
              />
            </div>
          )}

          {/* <FormInput
            label="Description"
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={!editMode}
          /> */}

          <FormInput
            label="Live Url"
            type="text"
            name="liveUrl"
            id="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            disabled={!editMode}
          />

          <FormInput
            label="Github Url"
            type="text"
            name="githubUrl"
            id="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            disabled={!editMode}
          />

          {/* <label htmlFor="githubUrl">Github Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="githubUrl"
        id="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        required
      /> */}

          {/* <label htmlFor="liveUrl">Live Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="liveUrl"
        id="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        required
      /> */}

          {/* <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        required
      /> */}

          <FormFieldWrapper label="Tags" id="tags">
            <TagInput
              label="Tags"
              id="tags"
              tags={formData.tags || []}
              handleTagChange={handleTagChange}
            />
          </FormFieldWrapper>

          {/* <label htmlFor="tags">Tags</label>
      <TagInput
        id="tags"
        tags={formData.tags || []}
        handleTagChange={handleTagChange}
      /> */}
        </form>
      </div>
    </div>
  );
};

export default ProjectsForm;
