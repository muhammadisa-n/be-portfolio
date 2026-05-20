import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { TranslationController } from "../controllers/translation-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";

export const translationRouter = express.Router();

translationRouter.get(
  "/api/translations/count",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  TranslationController.count
);
translationRouter.get(
  "/api/translations/sections/:section",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  TranslationController.getSection
);
translationRouter.post(
  "/api/translations/sections/:section",
  asyncHandler(authMiddleware),
  asyncHandler(apiKeyMiddleware),
  TranslationController.updateSection
);
