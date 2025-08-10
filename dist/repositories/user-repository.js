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
exports.UserRepository = void 0;
const database_1 = require("../config/database");
class UserRepository {
    static countByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.count({ where: { email } });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.create({ data });
        });
    }
    static findMany(filters, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.findMany({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
                skip,
                take,
                orderBy: { updated_at: "desc" },
            });
        });
    }
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.count({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.findUnique({
                where: { id },
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.update({
                where: { id },
                data,
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.delete({ where: { id } });
        });
    }
    static findUserByEmail(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.findFirst({
                where: {
                    email: login,
                },
            });
        });
    }
    static updateUser(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.update({
                where: { id },
                data,
            });
        });
    }
    static findemailExistsNotUserLoggedIn(email, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.user.count({
                where: {
                    email: email,
                    NOT: {
                        id: idUser,
                    },
                },
            });
        });
    }
}
exports.UserRepository = UserRepository;
