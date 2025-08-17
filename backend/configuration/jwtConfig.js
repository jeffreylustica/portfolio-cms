import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// generate random secret key
// const secretKey = crypto.randomBytes(32).toString("hex");
const secretKey = process.env.JWT_SECRET_KEY;

export default secretKey;
