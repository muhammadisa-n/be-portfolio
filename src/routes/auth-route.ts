import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { AuthController } from "../controllers/auth-controller";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";
export const authRouter = express.Router();

authRouter.post(
  "/api/auth/login",
  asyncHandler(apiKeyMiddleware),
  AuthController.login
);

authRouter.post(
  "/api/auth/login/google",
  asyncHandler(apiKeyMiddleware),
  AuthController.loginWithGoogle
);
authRouter.get(
  "/api/auth/me",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  AuthController.me
);
authRouter.post(
  "/api/auth/logout",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  AuthController.logout
);
authRouter.get(
  "/api/auth/refresh-token",
  asyncHandler(apiKeyMiddleware),
  AuthController.refreshToken
);
authRouter.patch(
  "/api/auth/me",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  AuthController.updateProfile
);
