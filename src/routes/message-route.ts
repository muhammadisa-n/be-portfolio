import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
import { MessageController } from "../controllers/message-controller";

export const messageRouter = express.Router();

// Example routes:
messageRouter.get(
  "/api/messages",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  MessageController.getAll
);
messageRouter.get(
  "/api/messages/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  MessageController.getOne
);
messageRouter.post(
  "/api/messages",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  MessageController.create
);
messageRouter.patch(
  "/api/messages/:id/delete",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  MessageController.softDelete
);
messageRouter.patch(
  "/api/messages/:id/restore",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  MessageController.restoreData
);
messageRouter.delete(
  "/api/messages/:id",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  MessageController.hardDelete
);
