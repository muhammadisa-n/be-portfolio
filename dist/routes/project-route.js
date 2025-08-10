"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
const project_controller_1 = require("../controllers/project-controller");
exports.projectRouter = express_1.default.Router();
// Example routes:
exports.projectRouter.get("/api/projects", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.getAll);
exports.projectRouter.get("/api/projects/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.getOne);
exports.projectRouter.post("/api/projects", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.create);
exports.projectRouter.put("/api/projects/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.update);
exports.projectRouter.patch("/api/projects/:id/delete", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.softDelete);
exports.projectRouter.patch("/api/projects/:id/restore", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.restoreData);
exports.projectRouter.delete("/api/projects/:id", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), project_controller_1.ProjectController.hardDelete);
