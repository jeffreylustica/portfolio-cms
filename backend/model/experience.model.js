import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  logoPublicId: {
    type: String,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  iconPublicId: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

const Experience = mongoose.model("Experience", ExperienceSchema);

export default Experience;
