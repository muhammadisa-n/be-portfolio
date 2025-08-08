import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ProjectController } from "../controllers/project-controller";

export const projectRouter = express.Router();

// Example routes:
projectRouter.get(
  "/api/projects",
  asyncHandler(authMiddleware),
  ProjectController.getAll
);
projectRouter.get(
  "/api/projects/:id",
  asyncHandler(authMiddleware),
  ProjectController.getOne
);
projectRouter.post(
  "/api/projects",
  asyncHandler(authMiddleware),
  ProjectController.create
);
projectRouter.put(
  "/api/projects/:id",
  asyncHandler(authMiddleware),
  ProjectController.update
);
projectRouter.patch(
  "/api/projects/:id/delete",
  asyncHandler(authMiddleware),
  ProjectController.softDelete
);
projectRouter.patch(
  "/api/projects/:id/restore",
  asyncHandler(authMiddleware),
  ProjectController.restoreData
);
projectRouter.delete(
  "/api/projects/:id",
  asyncHandler(authMiddleware),
  ProjectController.hardDelete
);
