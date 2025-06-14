import {
  createDetailsService,
  updateDetailsService,
  deleteDetailsService,
} from "../services/personal-details.service.js";

const createPersonalDetail = async (req, res, next) => {
  try {
    const personalDetailsData = req.body;
    const personalDetail = await createDetailsService(personalDetailsData);
    res.status(201).json({
      details: personalDetail,
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
      details: updatedPersonalDetail,
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
      details: deletedPersonalDetails,
      message: "Personal detail deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createPersonalDetail, updatePersonalDetail, deletePersonalDetail };
