"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.UserService = void 0;
const user_dto_1 = require("../dtos/user-dto");
const response_error_1 = require("../utils/response-error");
const user_validation_1 = require("../validations/user-validation");
const validation_1 = require("../utils/validation");
const argon2 = __importStar(require("argon2"));
const list_dto_1 = require("../dtos/list-dto");
const user_repository_1 = require("../repositories/user-repository");
class UserService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(user_validation_1.UserValidation.CREATE, request);
            const emailExits = yield user_repository_1.UserRepository.countByEmail(data.email);
            if (emailExits != 0) {
                throw new response_error_1.ResponseError(409, "Email Sudah Terdaftar");
            }
            data.password = yield argon2.hash(data.password);
            const response = yield user_repository_1.UserRepository.create({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });
            return (0, user_dto_1.toUserResponse)(response);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestList = validation_1.Validation.validate(user_validation_1.UserValidation.LIST, request);
            const filters = [];
            if (requestList.name) {
                filters.push({
                    fullName: {
                        contains: requestList.name,
                    },
                });
            }
            const data = yield user_repository_1.UserRepository.findMany(filters, requestList.skip, requestList.take);
            const totalData = yield user_repository_1.UserRepository.count(filters);
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
            const data = yield user_repository_1.UserRepository.findById(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            return (0, user_dto_1.toUserResponse)(data);
        });
    }
    static update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            const user = yield user_repository_1.UserRepository.findById(id);
            if (!user) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            if (data.fullName) {
                user.fullName = data.fullName;
            }
            if (data.password) {
                user.password = yield argon2.hash(data.password);
            }
            if (data.email && data.email !== user.email) {
                const emailExists = yield user_repository_1.UserRepository.countByEmail(data.email);
                if (emailExists != 0) {
                    throw new response_error_1.ResponseError(409, "Email Sudah Ada");
                }
                user.email = data.email;
            }
            const result = yield user_repository_1.UserRepository.update(id, {
                fullName: user.fullName,
                password: user.password,
                email: user.email,
            });
            return (0, user_dto_1.toUserResponse)(result);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield user_repository_1.UserRepository.findById(id);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Data Tidak Ditemukan");
            }
            yield user_repository_1.UserRepository.delete(id);
        });
    }
}
exports.UserService = UserService;
