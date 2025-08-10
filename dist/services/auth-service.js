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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_dto_1 = require("../dtos/user-dto");
const response_error_1 = require("../utils/response-error");
const user_validation_1 = require("../validations/user-validation");
const validation_1 = require("../utils/validation");
const argon2 = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user-repository");
const database_1 = require("../config/database");
const env_1 = require("../config/env");
class AuthService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const emailExits = yield user_repository_1.UserRepository.countByEmail(data.email);
            if (emailExits != 0) {
                throw new response_error_1.ResponseError(409, "Akun Sudah Terdaftar!");
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
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const userExits = yield user_repository_1.UserRepository.findUserByEmail(data.email);
            if (!userExits) {
                throw new response_error_1.ResponseError(401, "Gagal Login! Detail login salah");
            }
            const isPasswordValid = yield argon2.verify(userExits.password, data.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Gagal Login! Detail login salah");
            }
            const refreshToken = jsonwebtoken_1.default.sign({
                user_id: userExits.id,
                user_fullName: userExits.fullName,
                user_email: userExits.email,
            }, env_1.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            const accessToken = jsonwebtoken_1.default.sign({
                user_id: userExits.id,
                user_fullName: userExits.fullName,
                user_email: userExits.email,
            }, env_1.env.JWT_SECRET, {
                expiresIn: "5m",
            });
            const user = (0, user_dto_1.toUserResponse)(userExits);
            return { user, refreshToken, accessToken };
        });
    }
    static me(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_dto_1.toUserDetailResponse)(user);
        });
    }
    static updateProfile(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            if (data.fullName) {
                user.fullName = data.fullName;
            }
            if (data.password) {
                user.password = yield argon2.hash(data.password);
            }
            if (data.email && data.email !== user.email) {
                const emailExists = yield user_repository_1.UserRepository.findemailExistsNotUserLoggedIn(data.email, user.id);
                if (emailExists != 0) {
                    throw new response_error_1.ResponseError(409, "Email Sudah Ada");
                }
                user.email = data.email;
            }
            const result = yield user_repository_1.UserRepository.updateUser({
                fullName: user.fullName,
                password: user.password,
                email: user.email,
            }, user.id);
            return (0, user_dto_1.toUserResponse)(result);
        });
    }
    static logout(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refresh_token;
            if (!req.user) {
                throw new response_error_1.ResponseError(401, "Unauthorized: Anda Belum Login.");
            }
            if (!refreshToken) {
                throw new response_error_1.ResponseError(401, "Unauthorized: Anda Belum Login.");
            }
            return refreshToken;
        });
    }
    static refreshToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) {
                throw new response_error_1.ResponseError(401, "Unauthorized, Anda Belum Login");
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.env.JWT_SECRET);
                const user = yield database_1.prismaClient.user.findUnique({
                    where: { id: decoded.user_id },
                });
                if (!user) {
                    throw new response_error_1.ResponseError(401, "Unauthorized, Anda Belum Login.");
                }
                const payload = {
                    user_id: user.id,
                    user_fullName: user.fullName,
                    user_email: user.email,
                };
                const accessToken = jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
                    expiresIn: "6m",
                });
                return { accessToken, user: payload };
            }
            catch (err) {
                throw new response_error_1.ResponseError(401, "Token Tidak Valid Atau Kadaluarsa");
            }
        });
    }
}
exports.AuthService = AuthService;
