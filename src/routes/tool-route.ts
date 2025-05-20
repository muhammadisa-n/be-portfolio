import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ToolController } from "../controllers/tool-controller";

export const toolRouter = express.Router();

toolRouter.get("/api/tools", ToolController.getAll);
toolRouter.get("/api/tools/:id", ToolController.getOne);
toolRouter.post("/api/tools", ToolController.create);
toolRouter.put("/api/tools/:id", ToolController.update);
toolRouter.patch("/api/tools/:id/delete", ToolController.softDelete);
toolRouter.patch("/api/tools/:id/restore", ToolController.restoreData);
toolRouter.delete("/api/tools/:id", ToolController.hardDelete);
