import jwt from "jsonwebtoken";
import secretKey from "../configuration/jwtConfig.js";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid token or expired session!" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

export { authenticateToken };
