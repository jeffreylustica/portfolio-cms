import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { generateToken, verifyToken } from "../utils/jwtUtils.js";

const authenticateUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export { authenticateUser };
