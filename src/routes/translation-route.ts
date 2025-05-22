import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { TranslationController } from "../controllers/translation-controller";

export const translationRouter = express.Router();

// Example routes:
translationRouter.get("/api/translations", TranslationController.getAll);
