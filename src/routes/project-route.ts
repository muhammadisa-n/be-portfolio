import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ProjectController } from "../controllers/project-controller";

export const projectRouter = express.Router();

// Example routes:
projectRouter.get("/api/projects", ProjectController.getAll);
projectRouter.get("/api/projects/:id", ProjectController.getOne);
projectRouter.post("/api/projects", ProjectController.create);
projectRouter.put("/api/projects/:id", ProjectController.update);
projectRouter.patch("/api/projects/:id/delete", ProjectController.softDelete);
projectRouter.patch("/api/projects/:id/restore", ProjectController.restoreData);
projectRouter.delete("/api/projects/:id", ProjectController.hardDelete);
