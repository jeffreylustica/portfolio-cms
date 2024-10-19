import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let isExistingUser = await User.findOne({ username });

    if (isExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      password: bcrypt.hashSync(password),
    });

    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });

      res.status(200).json({ message: "Successfully Logged In", user, token });
    } else {
      res.status(400).json({ message: "Invalid Username/Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return new Error(error);
  }
};

export { signup, login, verifyToken, getUser };
