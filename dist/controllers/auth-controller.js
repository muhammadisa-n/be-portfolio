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
exports.AuthController = void 0;
const response_1 = require("../utils/response");
const auth_service_1 = require("../services/auth-service");
const env_1 = require("../config/env");
class AuthController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield auth_service_1.AuthService.register(request);
                res.status(201).json((0, response_1.successResponse)("Register Berhasil", 201, response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield auth_service_1.AuthService.login(request);
                res.cookie("refresh_token", response.refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: env_1.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                });
                res.status(200).json((0, response_1.successResponse)("Login Berhasil", 200, {
                    user: response.user,
                    accessToken: response.accessToken,
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield auth_service_1.AuthService.me(req.user);
                res
                    .status(200)
                    .json((0, response_1.successResponse)("Get Detail User Berhasil", 200, response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield auth_service_1.AuthService.updateProfile(req.user, request);
                res.status(200).json((0, response_1.successUpdateResponse)(response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_service_1.AuthService.logout(req);
            res.clearCookie("refresh_token");
            res.status(200).json((0, response_1.successResponse)("Logout berhasil", 200));
        });
    }
    static refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield auth_service_1.AuthService.refreshToken(req);
                res.status(200).json((0, response_1.successResponse)("Get Access Token Berhasil", 200, {
                    user: response.user,
                    accessToken: response.accessToken,
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
