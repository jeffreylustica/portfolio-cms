import jwt from "jsonwebtoken";
import secretKey from "../configuration/jwtConfig.js";

const authenticateToken = (res, req, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }
  const [bearer, token] = authHeader.split[" "];
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format!" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token!" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
