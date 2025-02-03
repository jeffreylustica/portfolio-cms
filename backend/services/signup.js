import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const { username, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = new User({
    username,
    password: hashedPassword,
  });

  const savedUser = await createdUser.save();
  return savedUser;
};

export default createUser;
