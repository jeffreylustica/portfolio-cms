import mongoose from "mongoose";

const PersonalDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const PersonalDetail = mongoose.model("PersonalDetail", PersonalDetailSchema);

export default PersonalDetail;
