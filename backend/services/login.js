import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateToken from "../utils/jwtUtils.js";
import { verifyToken } from "../utils/authMiddleware.js";

const userAuth = async (username, password) => {
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

const refreshToken = async (oldToken) => {
  try {
    const decodedToken = verifyToken(oldToken);
    const user = User.findById(decodedToken._id);
    if (!user) {
      throw new error("User not found");
    }
    const newToken = generateToken(user);
    return newToken;
  } catch (error) {
    throw new error("Invalid token");
  }
};

export { userAuth, refreshToken };
