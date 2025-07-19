import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    filePublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", FileSchema);

export default File;
