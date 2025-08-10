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
exports.ToolController = void 0;
const response_1 = require("../utils/response");
const tool_service_1 = require("../services/tool-service");
const upload_1 = require("../utils/upload");
const fs_1 = __importDefault(require("fs"));
class ToolController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const request = {
                    name: req.body.name,
                    description: req.body.description,
                    tool_url: req.body.tool_url,
                    dad: req.body.dad,
                };
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                if (!file) {
                    res.status(400).json((0, response_1.errorResponse)("Image Belum Diupload", 400));
                }
                const image = Array.isArray(file) ? file[0] : file;
                (0, upload_1.validateImageFile)(image);
                const response = yield tool_service_1.ToolService.create(request, image);
                fs_1.default.unlink(image.tempFilePath, (err) => {
                    if (err)
                        console.error("Gagal Hapus File Temp", err);
                });
                res.status(201).json((0, response_1.successCreateResponse)(response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                const take = Number(req.query.take) || 10;
                const request = {
                    page: page,
                    take: take,
                    skip: (page - 1) * take,
                    name: req.query.name,
                };
                const response = yield tool_service_1.ToolService.getAll(request);
                res
                    .status(200)
                    .json((0, response_1.successResponse)("Berhasil Get All Data", 200, response));
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield tool_service_1.ToolService.getOne(Number(id));
                res
                    .status(200)
                    .json((0, response_1.successResponse)("Berhasil Get Detail Data", 200, response));
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const request = {
                    name: req.body.name,
                    description: req.body.description,
                    tool_url: req.body.tool_url,
                    dad: req.body.dad,
                };
                const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                const image = Array.isArray(file) ? file[0] : file;
                if (image) {
                    (0, upload_1.validateImageFile)(image);
                }
                const response = yield tool_service_1.ToolService.update(request, Number(req.params.id), image);
                res.status(200).json((0, response_1.successUpdateResponse)(response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static softDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield tool_service_1.ToolService.softDelete(Number(id));
                res.status(200).json((0, response_1.successDeleteResponse)());
            }
            catch (e) {
                next(e);
            }
        });
    }
    static restoreData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield tool_service_1.ToolService.restoreData(Number(id));
                res.status(200).json((0, response_1.successRestoreResponse)());
            }
            catch (e) {
                next(e);
            }
        });
    }
    static hardDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield tool_service_1.ToolService.hardDelete(Number(id));
                res.status(200).json((0, response_1.successDeleteResponse)());
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ToolController = ToolController;
