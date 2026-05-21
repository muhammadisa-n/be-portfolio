import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
import { TrashController } from "../controllers/trash-controller";
export const trashRouter = express.Router();
trashRouter.get(
  "/api/trash",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  TrashController.getAll
);
trashRouter.patch(
  "/api/trash/restore",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  TrashController.bulkRestore
);
trashRouter.delete(
  "/api/trash/hard-delete",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  TrashController.bulkHardDelete
);
