import express from "express";
import { UserController } from "../controllers/user-controller";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";
import { apiKeyMiddleware } from "../middleware/api-key-middleware";

export const userRouter = express.Router();

userRouter.post(
  "/api/users",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  UserController.create
);

userRouter.get(
  "/api/users",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  UserController.getAll
);
userRouter.get(
  "/api/users/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  UserController.getOne
);

userRouter.put(
  "/api/users/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  UserController.update
);

userRouter.delete(
  "/api/users/:id",
  asyncHandler(apiKeyMiddleware),
  asyncHandler(authMiddleware),
  UserController.delete
);
