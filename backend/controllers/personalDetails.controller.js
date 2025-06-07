import {
  createDetailsService,
  updateDetailsService,
  deleteDetailsService,
} from "../services/personalDetailsService.js";

const createPersonalDetail = async (req, res, next) => {
  try {
    const personalDetailsData = req.body;
    const personalDetail = await createDetailsService(personalDetailsData);
    res.status(201).json({
      detail: personalDetail,
      message: "Personal detail created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePersonalDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const personalDetailsData = req.body;
    const updatedPersonalDetail = await updateDetailsService(
      id,
      personalDetailsData
    );
    res.status(200).json({
      detail: updatedPersonalDetail,
      message: "Personal detail updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deletePersonalDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPersonalDetails = await deleteDetailsService(id);
    res.status(200).json({
      detail: deletedPersonalDetails,
      message: "Personal detail deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createPersonalDetail, updatePersonalDetail, deletePersonalDetail };
