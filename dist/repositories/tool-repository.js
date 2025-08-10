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
exports.ToolRepository = void 0;
const database_1 = require("../config/database");
class ToolRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.create({ data });
        });
    }
    static findMany(filters, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.findMany({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
                skip,
                take,
                orderBy: { created_at: "asc" },
            });
        });
    }
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.count({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.findUnique({ where: { id } });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.update({ where: { id }, data });
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.update({
                where: { id },
                data: { deleted_at: new Date() },
            });
        });
    }
    static restore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.update({
                where: { id },
                data: { deleted_at: null },
            });
        });
    }
    static hardDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.delete({ where: { id } });
        });
    }
    static findDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.findFirst({
                where: {
                    id,
                    deleted_at: { not: null },
                },
            });
        });
    }
    static findNotDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.tool.findFirst({
                where: {
                    id,
                    deleted_at: null,
                },
            });
        });
    }
}
exports.ToolRepository = ToolRepository;
