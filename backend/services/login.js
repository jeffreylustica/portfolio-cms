import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateToken from "../utils/jwtUtils.js";

const userAuth = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new Error("User not found");
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export default userAuth;
