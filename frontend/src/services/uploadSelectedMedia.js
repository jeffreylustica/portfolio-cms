import uploadMediaFile from "./uploadMediaFile";

const uploadSelectedMedia = async (selectedFiles) => {
  const uploads = {};

  for (const [field, file] of Object.entries(selectedFiles)) {
    if (file) {
      const uploaded = await uploadMediaFile(file);
      uploads[field] = uploaded;
    }
  }

  return uploads;
};
export default uploadSelectedMedia;
