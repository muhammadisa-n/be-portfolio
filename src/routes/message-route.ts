import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { MessageController } from "../controllers/message-controller";

export const messageRouter = express.Router();

// Example routes:
messageRouter.get("/api/messages", MessageController.getAll);
messageRouter.get("/api/messages/:id", MessageController.getOne);
messageRouter.post("/api/messages", MessageController.create);
messageRouter.patch("/api/messages/:id/delete", MessageController.softDelete);
messageRouter.patch("/api/messages/:id/restore", MessageController.restoreData);
messageRouter.delete("/api/messages/:id", MessageController.hardDelete);
