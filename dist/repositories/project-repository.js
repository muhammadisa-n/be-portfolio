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
exports.ProjectRepository = void 0;
const database_1 = require("../config/database");
class ProjectRepository {
    static create(data, tool_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProject = yield database_1.prismaClient.project.create({ data });
            if (tool_ids.length > 0) {
                yield database_1.prismaClient.projectHasTool.createMany({
                    data: tool_ids.map((toolId) => ({
                        project_id: createdProject.id,
                        tool_id: toolId,
                    })),
                    skipDuplicates: true,
                });
                return createdProject;
            }
            return createdProject;
        });
    }
    static findMany(filters, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.findMany({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
                skip,
                take,
                orderBy: { created_at: "asc" },
                include: {
                    project_has_tool: {
                        include: {
                            tool: { select: { name: true } },
                        },
                    },
                },
            });
        });
    }
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.count({
                where: {
                    AND: filters,
                    deleted_at: null,
                },
            });
        });
    }
    static countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.count({
                where: {
                    deleted_at: null,
                },
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.findUnique({ where: { id } });
        });
    }
    static update(id, data, tool_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProject = yield database_1.prismaClient.project.update({
                where: { id },
                data,
            });
            if (tool_ids && Array.isArray(tool_ids)) {
                yield database_1.prismaClient.projectHasTool.deleteMany({
                    where: { project_id: id },
                });
                if (tool_ids.length > 0) {
                    yield database_1.prismaClient.projectHasTool.createMany({
                        data: tool_ids.map((toolId) => ({
                            project_id: id,
                            tool_id: toolId,
                        })),
                        skipDuplicates: true,
                    });
                }
            }
            return updatedProject;
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.update({
                where: { id },
                data: { deleted_at: new Date() },
            });
        });
    }
    static restore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.update({
                where: { id },
                data: { deleted_at: null },
            });
        });
    }
    static hardDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.delete({ where: { id } });
        });
    }
    static findDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.findFirst({
                where: {
                    id,
                    deleted_at: { not: null },
                },
            });
        });
    }
    static findNotDeleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.project.findFirst({
                where: {
                    id,
                    deleted_at: null,
                },
            });
        });
    }
}
exports.ProjectRepository = ProjectRepository;
