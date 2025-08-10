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
exports.MessageController = void 0;
const response_1 = require("../utils/response");
const message_service_1 = require("../services/message-service");
const sendEmail_1 = require("../utils/sendEmail");
class MessageController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    message: req.body.message,
                };
                const response = yield message_service_1.MessageService.create(request);
                yield (0, sendEmail_1.sendEmail)(response);
                res
                    .status(201)
                    .json((0, response_1.successResponse)("Message Berhasil Terkirim", 201, response));
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
                const response = yield message_service_1.MessageService.getAll(request);
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
                const response = yield message_service_1.MessageService.getOne(id);
                res
                    .status(200)
                    .json((0, response_1.successResponse)("Berhasil Get Detail Data", 200, response));
            }
            catch (e) {
                next(e);
            }
        });
    }
    static softDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield message_service_1.MessageService.softDelete(id);
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
                yield message_service_1.MessageService.restoreData(id);
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
                yield message_service_1.MessageService.hardDelete(id);
                res.status(200).json((0, response_1.successDeleteResponse)());
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.MessageController = MessageController;
