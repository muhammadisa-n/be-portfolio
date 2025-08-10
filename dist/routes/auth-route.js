"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
const auth_controller_1 = require("../controllers/auth-controller");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/api/auth/register", auth_controller_1.AuthController.register);
exports.authRouter.post("/api/auth/login", auth_controller_1.AuthController.login);
exports.authRouter.get("/api/auth/me", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), auth_controller_1.AuthController.me);
exports.authRouter.post("/api/auth/logout", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), auth_controller_1.AuthController.logout);
exports.authRouter.get("/api/auth/refresh-token", auth_controller_1.AuthController.refreshToken);
exports.authRouter.put("/api/auth/update-profile", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), auth_controller_1.AuthController.updateProfile);
