"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolRouter = void 0;
const express_1 = __importDefault(require("express"));
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
const tool_controller_1 = require("../controllers/tool-controller");
exports.toolRouter = express_1.default.Router();
exports.toolRouter.get("/api/tools", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.getAll);
exports.toolRouter.get("/api/tools/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.getOne);
exports.toolRouter.post("/api/tools", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.create);
exports.toolRouter.put("/api/tools/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.update);
exports.toolRouter.patch("/api/tools/:id/delete", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.softDelete);
exports.toolRouter.patch("/api/tools/:id/restore", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.restoreData);
exports.toolRouter.delete("/api/tools/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), tool_controller_1.ToolController.hardDelete);
