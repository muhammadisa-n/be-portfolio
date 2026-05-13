import express from "express";

import { ProjectController } from "../controllers/project-controller";
import { MessageController } from "../controllers/message-controller";
import { ToolController } from "../controllers/tool-controller";
import { FileController } from "../controllers/file-controller";
import { TranslationController } from "../controllers/translation-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
import { asyncHandler } from "../utils/async-handler";
export const publicRouter = express.Router();

// Example routes:
publicRouter.get(
  "/api/public/projects",
  asyncHandler(apiKeyMiddleware),
  ProjectController.getAll
);
publicRouter.get(
  "/api/public/projects/count",
  asyncHandler(apiKeyMiddleware),
  ProjectController.count
);
publicRouter.get(
  "/api/public/tools/",
  asyncHandler(apiKeyMiddleware),
  ToolController.getAll
);
publicRouter.post(
  "/api/public/messages/",
  asyncHandler(apiKeyMiddleware),
  MessageController.create
);
publicRouter.get(
  "/api/public/files/download/:id",
  asyncHandler(apiKeyMiddleware),
  FileController.download
);
publicRouter.get(
  "/api/public/translations",
  asyncHandler(apiKeyMiddleware),
  TranslationController.getAll
);
