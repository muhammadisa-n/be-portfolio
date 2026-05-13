import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
import { FileController } from "../controllers/file-controller";

export const fileRouter = express.Router();

// Example routes:
fileRouter.post(
  "/api/files/upload",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  FileController.upload
);
