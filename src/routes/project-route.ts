import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ProjectController } from "../controllers/project-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";

export const projectRouter = express.Router();

// Example routes:
projectRouter.get(
  "/api/projects",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.getAll
);
projectRouter.get(
  "/api/projects/count",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ProjectController.count
);

projectRouter.get(
  "/api/projects/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.getOne
);
projectRouter.post(
  "/api/projects",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.create
);
projectRouter.put(
  "/api/projects/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.update
);
projectRouter.patch(
  "/api/projects/:id/delete",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.softDelete
);
projectRouter.patch(
  "/api/projects/:id/restore",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.restoreData
);
projectRouter.delete(
  "/api/projects/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.hardDelete
);

projectRouter.post(
  "/api/projects/:id/images",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.addProjectImages
);
projectRouter.patch(
  "/api/projects/:id/images/sort",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.sortProjectImages
);
projectRouter.delete(
  "/api/projects/:id/images/:imageId",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  ProjectController.deleteProjectImage
);
