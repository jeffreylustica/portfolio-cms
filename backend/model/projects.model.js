import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    tags: {
      type: [
        {
          id: { type: String, required: true },
          text: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
