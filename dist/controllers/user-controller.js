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
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const response_1 = require("../utils/response");
class UserController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                console.log(request);
                const response = yield user_service_1.UserService.create(request);
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
                const response = yield user_service_1.UserService.getAll(request);
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
                const response = yield user_service_1.UserService.getOne(id);
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
            try {
                const id = req.params.id;
                const request = req.body;
                const response = yield user_service_1.UserService.update(id, request);
                res.status(200).json((0, response_1.successUpdateResponse)(response));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield user_service_1.UserService.delete(id);
                res.status(200).json((0, response_1.successDeleteResponse)());
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
