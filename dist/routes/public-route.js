"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project-controller");
const message_controller_1 = require("../controllers/message-controller");
const tool_controller_1 = require("../controllers/tool-controller");
const file_controller_1 = require("../controllers/file-controller");
const translation_controller_1 = require("../controllers/translation-controller");
exports.publicRouter = express_1.default.Router();
// Example routes:
exports.publicRouter.get("/api/public/projects", project_controller_1.ProjectController.getAll);
exports.publicRouter.get("/api/public/projects/count", project_controller_1.ProjectController.count);
exports.publicRouter.get("/api/public/tools/", tool_controller_1.ToolController.getAll);
exports.publicRouter.post("/api/public/messages/", message_controller_1.MessageController.create);
exports.publicRouter.get("/api/public/files/download/:id", file_controller_1.FileController.download);
exports.publicRouter.get("/api/public/translations", translation_controller_1.TranslationController.getAll);
