import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/", userRouter);

app.get("/api/test", async (req, res, next) => {
  try {
    return res.status(201).json({ message: "hello world" });
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });