import createUser from "../services/signup.js";
import userAuth from "../services/login.js";

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
  try {
    const { username, password } = req.body;
    const token = await userAuth(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export { signup, login };
