import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./configuration/config.js";
import userRouter from "./routes/user.route.js";
import personalDetailsRouter from "./routes/personalDetails.route.js";
import projectsRouter from "./routes/projects.route.js";
import skillsRouter from "./routes/skills.route.js";
import experienceRouter from "./routes/experiences.route.js";
import filesRouter from "./routes/files.route.js";
import collectionsRouter from "./routes/collections.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import documentsRouter from "./routes/documents.route.js";
import uploadsRouter from "./routes/upload.route.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jeff-portfolio-cms.netlify.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/personal-details", personalDetailsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/files", filesRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api", documentsRouter);
app.use("/api", uploadsRouter);

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
