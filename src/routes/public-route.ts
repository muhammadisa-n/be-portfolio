import express from "express";

import { ProjectController } from "../controllers/project-controller";
import { MessageController } from "../controllers/message-controller";
import { ToolController } from "../controllers/tool-controller";
import { FileController } from "../controllers/file-controller";
import { TranslationController } from "../controllers/translation-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";

export const publicRouter = express.Router();

publicRouter.use(apiKeyMiddleware);

// Example routes:
publicRouter.get("/api/public/projects", ProjectController.getAll);
publicRouter.get("/api/public/projects/count", ProjectController.count);
publicRouter.get("/api/public/tools/", ToolController.getAll);
publicRouter.post("/api/public/messages/", MessageController.create);
publicRouter.get("/api/public/files/download/:id", FileController.download);
publicRouter.get("/api/public/translations", TranslationController.getAll);
