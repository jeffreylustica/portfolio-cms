import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./configuration/config.js";
import userRouter from "./routes/user.route.js";
import personalDetailsRouter from "./routes/personalDetails.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/personal-details", personalDetailsRouter)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening to PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
