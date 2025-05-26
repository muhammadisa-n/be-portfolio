import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { FileController } from "../controllers/file-controller";

export const fileRouter = express.Router();

// Example routes:
fileRouter.post("/api/files/upload", FileController.upload);
fileRouter.get("/api/files/download/:id", FileController.download);
