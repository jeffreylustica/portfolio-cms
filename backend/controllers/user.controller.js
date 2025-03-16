import registerUser from "../services/registerService.js";
import { authenticateUser } from "../services/authService.js";
import findUser from "../services/userService.js";
import User from "../model/user.model.js";

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);
    res.status(201).json({ user: user, message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authenticateUser(username, password);

    res.cookie("token", token, {
      httpOnly: true, //Prevent JavaScript access
      // secure: process.env.NODE_ENV === "production", //Use HTTPS in production
      secure: false,
      sameSite: "Lax",
      maxAge: 30 * 1000,
    });

    res.status(201).json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const newToken = await authenticateUser(username, password);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Lax",
    //   maxAge: 30 * 1000,
    // });

    res.status(201).json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await findUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const user = await findUser();
    res.status(200).json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { signup, login, getUser, checkUserExists };
