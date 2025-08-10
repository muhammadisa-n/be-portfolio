"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
const express_1 = __importDefault(require("express"));
const async_handler_1 = require("../utils/async-handler");
const auth_middleware_1 = require("../middleware/auth-middleware");
const file_controller_1 = require("../controllers/file-controller");
exports.fileRouter = express_1.default.Router();
// Example routes:
exports.fileRouter.post("/api/files/upload", (0, async_handler_1.asyncHandler)(auth_middleware_1.authMiddleware), file_controller_1.FileController.upload);
