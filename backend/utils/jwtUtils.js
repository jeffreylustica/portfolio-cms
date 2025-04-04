import jwt from "jsonwebtoken";
import secretKey from "../configuration/jwtConfig.js";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1hr" });
};

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

export { generateToken, verifyToken };
