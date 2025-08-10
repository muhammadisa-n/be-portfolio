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
exports.authMiddleware = void 0;
const response_1 = require("../utils/response");
const database_1 = require("../config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_error_1 = require("../utils/response-error");
const env_1 = require("../config/env");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        throw new response_error_1.ResponseError(401, "Unauthorized: Anda Belum Login.");
    }
    const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json((0, response_1.errorResponse)("Unauthorized: Access Token Tidak Valid.", 401));
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
    }
    catch (err) {
        throw new response_error_1.ResponseError(401, "Unauthorized: Access Token Tidak Valid.");
    }
    const user = yield database_1.prismaClient.user.findUnique({
        where: { id: payload.user_id },
    });
    if (!user) {
        return res
            .status(401)
            .json((0, response_1.errorResponse)("Unauthorized: Anda belum login", 401));
    }
    req.user = user;
    next();
});
exports.authMiddleware = authMiddleware;
