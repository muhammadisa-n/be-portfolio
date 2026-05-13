import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { AuthController } from "../controllers/auth-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
export const authRouter = express.Router();
authRouter.post(
  "/api/auth/register",
  asyncHandler(apiKeyMiddleware),
  AuthController.register
);
authRouter.post("/api/auth/login", AuthController.login);
authRouter.get("/api/auth/me", asyncHandler(authMiddleware), AuthController.me);
authRouter.post(
  "/api/auth/logout",
  asyncHandler(authMiddleware),
  AuthController.logout
);
authRouter.get("/api/auth/refresh-token", AuthController.refreshToken);
authRouter.put(
  "/api/auth/update-profile",
  asyncHandler(authMiddleware),
  AuthController.updateProfile
);
