"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationRouter = void 0;
const express_1 = __importDefault(require("express"));
const translation_controller_1 = require("../controllers/translation-controller");
exports.translationRouter = express_1.default.Router();
// Example routes:
exports.translationRouter.get("/api/translations", translation_controller_1.TranslationController.getAll);
