import express from "express";
import { authRouter } from "./auth-route";
import { userRouter } from "./user-route";
import { toolRouter } from "./tool-route";
import { projectRouter } from "./project-route";
import { messageRouter } from "./message-route";
import { fileRouter } from "./file-route";
import { translationRouter } from "./translation-route";
import { publicRouter } from "./public-route";
import { trashRouter } from "./trash-route";

export const mainRouter = express.Router();

// mainRouter.get("/", (req, res) => {
//   res.render("index", { title: "Home Page" });
// });

mainRouter.get("/", (req, res) => {
  res
    .status(200)
    .json({
      app_name: process.env.APP_NAME,
      message: "Server its Running  🚀 ",
      author: "Muhammad Isa",
      status_code: 200,
    })
    .end();
});
mainRouter.get("/api", (req, res) => {
  res
    .status(200)
    .json({
      app_name: process.env.APP_NAME,
      message: "Api its Running  🚀 ",
      author: "Muhammad Isa",
      status_code: 200,
    })
    .end();
});
mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(toolRouter);
mainRouter.use(projectRouter);
mainRouter.use(messageRouter);
mainRouter.use(fileRouter);
mainRouter.use(translationRouter);
mainRouter.use(trashRouter);
mainRouter.use(publicRouter);
