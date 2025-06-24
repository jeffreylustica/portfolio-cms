import PersonalDetail from "../model/personalDetails.model.js";

const createDetailsService = async (data) => {
  try {
    const { name, value } = data;
    const createdPersonalDetail = new PersonalDetail({ name, value });
    const savedPersonalDetail = await createdPersonalDetail.save();
    return savedPersonalDetail;
  } catch (error) {
    console.error("Error creating personal detail:", error);
    throw new Error("Failed to create personal detail. Please try again.");
  }
};

const updateDetailsService = async (id, data) => {
  try {
    const { name, value } = data;
    const updatedPersonalDetail = await PersonalDetail.findByIdAndUpdate(
      id,
      { name, value },
      { new: true }
    );
    if (!updatedPersonalDetail) {
      throw new Error("Personal detail not found");
    }
    return updatedPersonalDetail;
  } catch (error) {
    console.log("Error updating personal detail:", error);
    throw new Error("Failed to update personal detail. Please try again.");
  }
};

const deleteDetailsService = async (id) => {
  try {
    const deletedPersonalDetail = await PersonalDetail.findByIdAndDelete(id);
    if (!deletedPersonalDetail) {
      throw new Error("Personal detail not found");
    }
    return deletedPersonalDetail;
  } catch (error) {
    console.log("Error deleting personal detail:", error);
    throw new Error("Failed to delete personal detail. Please try again.");
  }
};

export { createDetailsService, updateDetailsService, deleteDetailsService };
