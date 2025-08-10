"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = __importDefault(require("express"));
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
const message_controller_1 = require("../controllers/message-controller");
exports.messageRouter = express_1.default.Router();
// Example routes:
exports.messageRouter.get("/api/messages", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.getAll);
exports.messageRouter.get("/api/messages/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.getOne);
exports.messageRouter.post("/api/messages", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.create);
exports.messageRouter.patch("/api/messages/:id/delete", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.softDelete);
exports.messageRouter.patch("/api/messages/:id/restore", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.restoreData);
exports.messageRouter.delete("/api/messages/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), message_controller_1.MessageController.hardDelete);
