import User from "../model/user.model.js";

const getUserService = async () => {
  try {
    const user = await User.find({});
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export default getUserService;
