"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageFile = exports.uploadFile = exports.uploadImageProjects = exports.uploadImageTools = void 0;
const cloudinary_1 = require("../config/cloudinary");
const response_error_1 = require("./response-error");
const uploadImageTools = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.cloudinary.uploader.upload(file.tempFilePath, {
        folder: "portfolio/tools-images",
        tags: `tool-image`,
    });
    return {
        public_id: result.public_id,
        secure_url: result.secure_url,
    };
});
exports.uploadImageTools = uploadImageTools;
const uploadImageProjects = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.cloudinary.uploader.upload(file.tempFilePath, {
        folder: "portfolio/projects-images",
        tags: `project-image`,
    });
    return {
        public_id: result.public_id,
        secure_url: result.secure_url,
    };
});
exports.uploadImageProjects = uploadImageProjects;
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.cloudinary.uploader.upload(file.tempFilePath, {
        folder: "portfolio/uploads",
        tags: `portfolio-upload`,
    });
    return {
        public_id: result.public_id,
        secure_url: result.secure_url,
    };
});
exports.uploadFile = uploadFile;
const validateImageFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.mimetype)) {
        throw new response_error_1.ResponseError(400, "Format Image Tidak Valid");
    }
    if (file.size > maxSize) {
        throw new response_error_1.ResponseError(400, "Ukuran Image Maksimal 5MB.");
    }
};
exports.validateImageFile = validateImageFile;
