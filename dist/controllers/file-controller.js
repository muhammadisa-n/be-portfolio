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
exports.FileController = void 0;
const file_service_1 = require("../services/file-service");
const response_1 = require("../utils/response");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileController {
    static upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
                if (!file) {
                    res.status(400).json((0, response_1.errorResponse)("File Belum Diupload", 400));
                }
                const fileUpload = Array.isArray(file) ? file[0] : file;
                const response = yield file_service_1.FileService.upload(fileUpload);
                fs_1.default.unlink(fileUpload.tempFilePath, (err) => {
                    if (err)
                        console.error("Gagal Hapus File Temp", err);
                });
                res.status(200).json((0, response_1.successCreateResponse)(response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static download(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filename = req.params.id;
                const file = yield file_service_1.FileService.download(filename);
                if (!file) {
                    res.status(404).json((0, response_1.errorResponse)("File tidak ditemukan", 404));
                }
                const extension = file.mimetype.split("/")[1];
                const fullPath = path_1.default.join(__dirname, "../../public/uploads/files", file.file_id);
                const downloadName = `${file.filename}.${extension}`;
                if (!fs_1.default.existsSync(fullPath)) {
                    res
                        .status(404)
                        .json((0, response_1.errorResponse)("File tidak ditemukan di server", 404));
                }
                res.download(fullPath, downloadName);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.FileController = FileController;
