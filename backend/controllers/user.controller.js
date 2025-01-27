import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createUser from "../services/createUser.js";

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    res.status(201).json({ user: user, message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    let existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30s",
      }
    );

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "None", // For cross-site requests
      secure: false, // For HTTPS requests
    });

    return res.status(200).json({
      message: "Successfully logged in",
      user: existingUser,
      token,
    });
  } catch (error) {
    // Catch any errors and return a 500 status
    console.error("Error during login process:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const verifyToken = (req, res, next) => {
  // const cookies = req.headers.cookie;
  // const token = cookies.split("=")[1];
  const token = req.cookies.token;
  console.log(`token: ${token}`);
  return res.status(200).json({ message: `token ${token}` });
  // if (!token) {
  //   return res.status(404).json({ message: "No token found" });
  // }

  // jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
  //   if (err) {
  //     return res.status(400).json({ message: "Invalid token" });
  //   }
  //   req.id = user.id;
  //   next();
  // });
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
