import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ToolController } from "../controllers/tool-controller";

export const toolRouter = express.Router();

toolRouter.get(
  "/api/tools",
  asyncHandler(authMiddleware),
  ToolController.getAll
);
toolRouter.get(
  "/api/tools/:id",
  asyncHandler(authMiddleware),
  ToolController.getOne
);
toolRouter.post(
  "/api/tools",
  asyncHandler(authMiddleware),
  ToolController.create
);
toolRouter.put(
  "/api/tools/:id",
  asyncHandler(authMiddleware),
  ToolController.update
);
toolRouter.patch(
  "/api/tools/:id/delete",
  asyncHandler(authMiddleware),
  ToolController.softDelete
);
toolRouter.patch(
  "/api/tools/:id/restore",
  asyncHandler(authMiddleware),
  ToolController.restoreData
);
toolRouter.delete(
  "/api/tools/:id",
  asyncHandler(authMiddleware),
  ToolController.hardDelete
);
