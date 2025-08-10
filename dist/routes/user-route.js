"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/api/users", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), user_controller_1.UserController.create);
exports.userRouter.get("/api/users", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), user_controller_1.UserController.getAll);
exports.userRouter.get("/api/users/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), user_controller_1.UserController.getOne);
exports.userRouter.put("/api/users/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), user_controller_1.UserController.update);
exports.userRouter.delete("/api/users/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), user_controller_1.UserController.delete);
