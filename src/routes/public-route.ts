import express from "express";

import { ProjectController } from "../controllers/project-controller";
import { MessageController } from "../controllers/message-controller";
import { ToolController } from "../controllers/tool-controller";
import { FileController } from "../controllers/file-controller";
import { TranslationController } from "../controllers/translation-controller";
export const publicRouter = express.Router();

// Example routes:
publicRouter.get("/api/public/projects", ProjectController.getAll);
publicRouter.get("/api/public/projects/count", ProjectController.count);
publicRouter.get("/api/public/tools/", ToolController.getAll);
publicRouter.post("/api/public/messages/", MessageController.create);
publicRouter.get("/api/public/files/download/:id", FileController.download);
publicRouter.get("/api/public/translations", TranslationController.getAll);
