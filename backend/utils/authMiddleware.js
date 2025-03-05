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

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     return res.status(401).json({ message: "Unauthorized: Missing token!" });
//   }
//   console.log(authHeader);
//   const [bearer, token] = authHeader.split(" ");
//   if (bearer !== "Bearer" || !token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: Invalid token format!" });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Forbidden: Invalid token!" });
//     }
//     req.user = user;
//     next();
//   });
// };

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

export { authenticateToken, verifyToken };
