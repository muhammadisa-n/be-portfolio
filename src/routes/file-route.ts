import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
import { FileController } from "../controllers/file-controller";

export const fileRouter = express.Router();

// Example routes:
fileRouter.get(
  "/api/files",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  FileController.getAll
);
fileRouter.get(
  "/api/files/download/:version",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  FileController.download
);

fileRouter.patch(
  "/api/files/:id/delete",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  FileController.softDelete
);
fileRouter.post(
  "/api/files/upload",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  FileController.upload
);
