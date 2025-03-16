import User from "../model/user.model.js";

const findUser = async () => {
  try {
    const user = await User.findOne().select("-password");
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch users");
  }
};

export default findUser;
