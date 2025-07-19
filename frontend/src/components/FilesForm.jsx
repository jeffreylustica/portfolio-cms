import { useEffect } from "react";
import axios from "axios";
import { emptyFileFormTemplate } from "../constants/formTemplates.js";
import useFormData from "../hooks/useFormData.jsx";
import useMediaUploader from "../hooks/useMediaUploader.jsx";

const FilesForm = ({ activeDocument, onSave, onDelete }) => {
  const { formData, setFormData, handleChange } = useFormData(
    emptyFileFormTemplate
  );

  const { selectedFiles, handleFileChange, uploadMedia } =
    useMediaUploader(setFormData);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setFormData(emptyFileFormTemplate);
    } else {
      setFormData({
        ...emptyFileFormTemplate,
        ...activeDocument,
      });
    }
  }, [activeDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedFiles = null;

    const url =
      formData._id === "new"
        ? "http://localhost:5555/api/files"
        : `http://localhost:5555/api/files/${formData._id}`;

    const method = formData._id === "new" ? "post" : "put";

    try {
      if (selectedFiles) {
        uploadedFiles = await uploadMedia(selectedFiles);
      }

      const response = await axios[method](
        url,
        {
          name: formData.name,
          fileUrl: uploadedFiles.fileUrl?.imageUrl || formData.fileUrl,
          filePublicId:
            uploadedFiles.fileUrl?.imagePublicId || formData.filePublicId,
        },
        { withCredentials: true }
      );

      onSave(response.data.details);
      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Error saving:", error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData._id === "new") return; // Nothing to delete

    try {
      const response = await axios.delete(
        `http://localhost:5555/api/files/${formData._id}`,
        { withCredentials: true }
      );

      onDelete(response.data.details._id);
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  };

  if (!activeDocument) return <div className="p-4">Loading files...</div>;

  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl">Files</h1>

      <div className="flex justify-between mb-5">
        <button
          type="button"
          onClick={handleDelete}
          className="ml-auto text-red-500 hover:text-red-600 font-bold cursor-pointer"
        >
          DELETE ITEM
        </button>
      </div>

      <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="fileUrl">File Url</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="text"
        name="fileUrl"
        id="fileUrl"
        value={formData.fileUrl}
        required
        readOnly
      />

      <label htmlFor="fileUpload">Upload New File</label>
      <input
        className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
        type="file"
        id="fileUpload"
        accept="image/*,application/pdf"
        onChange={handleFileChange("fileUrl")}
      />

      {formData.fileUrl && (
        <iframe
          src={formData.fileUrl}
          width="100%"
          height="600"
          className="mb-5 rounded shadow"
          title="PDF preview"
          allowFullScreen
        ></iframe>
      )}

      <button
        type="submit"
        className="bg-blue-400 mr-auto px-10 py-4 font-bold text-white cursor-pointer"
      >
        SAVE
      </button>
    </form>
  );
};

export default FilesForm;
