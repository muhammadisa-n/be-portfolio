import express from "express";
import { successResponse } from "../utils/response";
import { authRouter } from "./auth-route";
import { userRouter } from "./user-route";
import { toolRouter } from "./tool-route";
import { projectRouter } from "./project-route";
import { messageRouter } from "./message-route";
import { translationRouter } from "./translation-route";
import { fileRouter } from "./file-route";

export const mainRouter = express.Router();

// mainRouter.get("/", (req, res) => {
//   res.render("index", { title: "Home Page" });
// });

mainRouter.get("/", (req, res) => {
  res
    .status(200)
    .json(successResponse(`${process.env.APP_NAME}  is running`, 200))
    .end();
});
mainRouter.get("/api", (req, res) => {
  res
    .status(200)
    .json(successResponse(`${process.env.APP_NAME} api is running`, 200))
    .end();
});
mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(toolRouter);
mainRouter.use(projectRouter);
mainRouter.use(messageRouter);
mainRouter.use(translationRouter);
mainRouter.use(fileRouter);
