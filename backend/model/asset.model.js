import mongoose, { mongo } from "mongoose";

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Asset = mongoose.model("Asset", AssetSchema);

export default Asset;
