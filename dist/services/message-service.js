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
exports.MessageService = void 0;
const validation_1 = require("../utils/validation");
const message_dto_1 = require("../dtos/message-dto");
const message_validation_1 = require("../validations/message-validation");
const list_dto_1 = require("../dtos/list-dto");
const response_error_1 = require("../utils/response-error");
const message_repository_1 = require("../repositories/message-repository");
class MessageService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(message_validation_1.MessageValidation.CREATE, request);
            const response = yield message_repository_1.MessageRepository.create({
                fullName: data.fullName,
                email: data.email,
                message: data.message,
            });
            return (0, message_dto_1.toMessageResponse)(response);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestList = validation_1.Validation.validate(message_validation_1.MessageValidation.LIST, request);
            const filters = [];
            if (requestList.name) {
                filters.push({
                    fullName: {
                        contains: requestList.name,
                    },
                });
            }
            const data = yield message_repository_1.MessageRepository.findMany(filters, requestList.skip, requestList.take);
            const totalData = yield message_repository_1.MessageRepository.count(filters);
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
            const data = yield message_repository_1.MessageRepository.findById(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            return (0, message_dto_1.toMessageResponse)(data);
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield message_repository_1.MessageRepository.findNotDeleted(id);
            if (!data || data.deleted_at) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield message_repository_1.MessageRepository.softDelete(id);
        });
    }
    static restoreData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield message_repository_1.MessageRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield message_repository_1.MessageRepository.restore(id);
        });
    }
    static hardDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield message_repository_1.MessageRepository.findDeleted(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield message_repository_1.MessageRepository.hardDelete(id);
        });
    }
}
exports.MessageService = MessageService;
