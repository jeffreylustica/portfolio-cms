import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
