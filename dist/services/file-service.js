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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const file_repository_1 = require("../repositories/file-repository");
const path_1 = __importDefault(require("path"));
const response_error_1 = require("../utils/response-error");
class FileService {
    static upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = path_1.default.parse(file.name).name;
            const extension = path_1.default.extname(file.name);
            const mimetype = file.mimetype;
            const newFilename = `${filename}-${Date.now()}${extension}`;
            const uploadPath = path_1.default.join("public", "uploads", "files", newFilename);
            yield file.mv(uploadPath);
            const response = yield file_repository_1.FileRepository.create({
                filename: filename,
                mimetype: mimetype,
                file_id: newFilename,
                file_url: `/uploads/files/${newFilename}`,
            });
            return response;
        });
    }
    static download(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                throw new response_error_1.ResponseError(404, "FIlename Tidak Ada");
            }
            const response = yield file_repository_1.FileRepository.findByFilename(filename);
            return response;
        });
    }
}
exports.FileService = FileService;
