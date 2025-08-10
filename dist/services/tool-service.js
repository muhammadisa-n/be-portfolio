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
exports.ToolService = void 0;
const validation_1 = require("../utils/validation");
const tool_dto_1 = require("../dtos/tool-dto");
const tool_validation_1 = require("../validations/tool-validation");
const list_dto_1 = require("../dtos/list-dto");
const response_error_1 = require("../utils/response-error");
const upload_1 = require("../utils/upload");
const cloudinary_1 = require("../config/cloudinary");
const tool_repository_1 = require("../repositories/tool-repository");
class ToolService {
    static create(request, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(tool_validation_1.ToolValidation.CREATE, request);
            const imageUpload = yield (0, upload_1.uploadImageTools)(file);
            const response = yield tool_repository_1.ToolRepository.create({
                name: data.name,
                description: data.description,
                tool_url: data.tool_url,
                dad: data.dad,
                image_id: imageUpload.public_id,
                image_url: imageUpload.secure_url,
            });
            return (0, tool_dto_1.toToolResponse)(response);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestList = validation_1.Validation.validate(tool_validation_1.ToolValidation.LIST, request);
            const filters = [];
            if (requestList.name) {
                filters.push({
                    name: {
                        contains: requestList.name,
                    },
                });
            }
            const data = yield tool_repository_1.ToolRepository.findMany(filters, requestList.skip, requestList.take);
            const totalData = yield tool_repository_1.ToolRepository.count(filters);
            const result = {
                data,
                total_data: totalData,
                paging: {
                    current_page: requestList.page,
                    total_page: Math.ceil(totalData / requestList.take),
                },
            };
            return (0, list_dto_1.tolistResponse)(result);
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield tool_repository_1.ToolRepository.findById(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            return (0, tool_dto_1.toToolResponse)(data);
        });
    }
    static update(request, id, file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const data = validation_1.Validation.validate(tool_validation_1.ToolValidation.UPDATE, request);
            const tool = yield tool_repository_1.ToolRepository.findById(id);
            if (!tool) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            let image_id = tool.image_id;
            let image_url = tool.image_url;
            if (file) {
                if (tool.image_id) {
                    yield cloudinary_1.cloudinary.uploader.destroy(tool.image_id);
                }
                const imageUpload = yield (0, upload_1.uploadImageTools)(file);
                image_id = imageUpload.public_id;
                image_url = imageUpload.secure_url;
            }
            const updated = yield tool_repository_1.ToolRepository.update(id, {
                name: (_a = data.name) !== null && _a !== void 0 ? _a : tool.name,
                description: (_b = data.description) !== null && _b !== void 0 ? _b : tool.description,
                tool_url: (_c = data.tool_url) !== null && _c !== void 0 ? _c : tool.tool_url,
                dad: (_d = data.dad) !== null && _d !== void 0 ? _d : tool.dad,
                image_id,
                image_url,
            });
            return (0, tool_dto_1.toToolResponse)(updated);
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield tool_repository_1.ToolRepository.findNotDeleted(id);
            if (!data || data.deleted_at) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield tool_repository_1.ToolRepository.softDelete(id);
        });
    }
    static restoreData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield tool_repository_1.ToolRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield tool_repository_1.ToolRepository.restore(id);
        });
    }
    static hardDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield tool_repository_1.ToolRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield tool_repository_1.ToolRepository.hardDelete(id);
        });
    }
}
exports.ToolService = ToolService;
