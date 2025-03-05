import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  try {
    const { username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user. Please try again.");
  }
};

export default createUser;
