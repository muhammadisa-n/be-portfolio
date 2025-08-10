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
exports.ProjectService = void 0;
const validation_1 = require("../utils/validation");
const project_dto_1 = require("../dtos/project-dto");
const project_validation_1 = require("../validations/project-validation");
const list_dto_1 = require("../dtos/list-dto");
const response_error_1 = require("../utils/response-error");
const upload_1 = require("../utils/upload");
const cloudinary_1 = require("../config/cloudinary");
const project_repository_1 = require("../repositories/project-repository");
class ProjectService {
    static create(request, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(project_validation_1.ProjectValidation.CREATE, request);
            const imageUpload = yield (0, upload_1.uploadImageProjects)(file);
            const response = yield project_repository_1.ProjectRepository.create({
                name: data.name,
                description: data.description,
                demo_url: data.demo_url,
                project_url: data.project_url,
                dad: data.dad,
                image_id: imageUpload.public_id,
                image_url: imageUpload.secure_url,
            }, data.tool_ids);
            return (0, project_dto_1.toProjectResponse)(response);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestList = validation_1.Validation.validate(project_validation_1.ProjectValidation.LIST, request);
            const filters = [];
            if (requestList.name) {
                filters.push({
                    name: {
                        contains: requestList.name,
                    },
                });
            }
            const data = yield project_repository_1.ProjectRepository.findMany(filters, requestList.skip, requestList.take);
            const totalData = yield project_repository_1.ProjectRepository.count(filters);
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
            const data = yield project_repository_1.ProjectRepository.findById(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            return (0, project_dto_1.toProjectResponse)(data);
        });
    }
    static update(request, id, file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const data = validation_1.Validation.validate(project_validation_1.ProjectValidation.UPDATE, request);
            const existingProject = yield project_repository_1.ProjectRepository.findById(id);
            if (!existingProject) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            let image_id = existingProject.image_id;
            let image_url = existingProject.image_url;
            if (file) {
                if (image_id) {
                    yield cloudinary_1.cloudinary.uploader.destroy(image_id);
                }
                const imageUpload = yield (0, upload_1.uploadImageProjects)(file);
                image_id = imageUpload.public_id;
                image_url = imageUpload.secure_url;
            }
            const updated = yield project_repository_1.ProjectRepository.update(id, {
                name: (_a = data.name) !== null && _a !== void 0 ? _a : existingProject.name,
                description: (_b = data.description) !== null && _b !== void 0 ? _b : existingProject.description,
                demo_url: (_c = data.demo_url) !== null && _c !== void 0 ? _c : existingProject.demo_url,
                project_url: (_d = data.project_url) !== null && _d !== void 0 ? _d : existingProject.project_url,
                dad: (_e = data.dad) !== null && _e !== void 0 ? _e : existingProject.dad,
                image_id,
                image_url,
            }, data.tool_ids);
            return (0, project_dto_1.toProjectResponse)(updated);
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield project_repository_1.ProjectRepository.findNotDeleted(id);
            if (!data || data.deleted_at) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield project_repository_1.ProjectRepository.softDelete(id);
        });
    }
    static restoreData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield project_repository_1.ProjectRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield project_repository_1.ProjectRepository.restore(id);
        });
    }
    static hardDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield project_repository_1.ProjectRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield project_repository_1.ProjectRepository.hardDelete(id);
        });
    }
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield project_repository_1.ProjectRepository.countAll();
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            return data;
        });
    }
}
exports.ProjectService = ProjectService;
