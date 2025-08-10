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
exports.FileRepository = void 0;
const database_1 = require("../config/database");
class FileRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.file.create({ data });
        });
    }
    static findByFilename(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.file.findFirst({
                where: {
                    filename: filename,
                    deleted_at: null,
                },
            });
        });
    }
    static findMany(filters, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.file.findMany({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
                skip,
                take,
            });
        });
    }
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.file.count({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.file.findUnique({ where: { id } });
        });
    }
    static update(id, data, tool_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.file.update({
                where: { id },
                data,
            });
        });
    }
    static Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.file.delete({
                where: { id },
            });
        });
    }
}
exports.FileRepository = FileRepository;
