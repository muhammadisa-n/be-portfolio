import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { ToolController } from "../controllers/tool-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";

export const toolRouter = express.Router();

toolRouter.get(
  "/api/tools",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.getAll
);
toolRouter.get(
  "/api/tools/count",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.count
);
toolRouter.get(
  "/api/tools/most-used",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.mostUsed
);
toolRouter.get(
  "/api/tools/:id",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.getOne
);
toolRouter.post(
  "/api/tools",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.create
);
toolRouter.put(
  "/api/tools/:id",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.update
);
toolRouter.delete(
  "/api/tools/:id/delete",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  ToolController.softDelete
);
