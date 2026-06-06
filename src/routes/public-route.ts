import express from "express";

import { ProjectController } from "../controllers/project-controller";
import { MessageController } from "../controllers/message-controller";
import { ToolController } from "../controllers/tool-controller";
import { FileController } from "../controllers/file-controller";
import { TranslationController } from "../controllers/translation-controller";
import { rateLimitMiddleware } from "../middleware/rate-limit-middleware";
export const publicRouter = express.Router();

// Example routes:
publicRouter.get("/api/public/projects", ProjectController.getAllPublic);
publicRouter.get("/api/public/projects/count", ProjectController.count);
publicRouter.get("/api/public/tools/", ToolController.getAllPublic);
publicRouter.post(
  "/api/public/messages/",
  rateLimitMiddleware,
  MessageController.create
);
publicRouter.get(
  "/api/public/files/download/:version",
  FileController.publicDownload
);
publicRouter.get("/api/public/translations", TranslationController.getAll);
publicRouter.get(
  "/api/public/files/check/:version",
  FileController.publicCheck
);
publicRouter.get("/api/public/files/hero-image", FileController.getHeroImage);
