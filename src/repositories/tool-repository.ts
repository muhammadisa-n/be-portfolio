import { prismaClient } from "../config/database";

export class ToolRepository {
  static async create(data: any) {
    return prismaClient.tool.create({ data });
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.tool.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  static async count(filters: any) {
    return prismaClient.tool.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: number) {
    return prismaClient.tool.findUnique({ where: { id } });
  }

  static async update(id: number, data: any) {
    return prismaClient.tool.update({ where: { id }, data });
  }

  static async softDelete(id: number) {
    return prismaClient.tool.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  static async restore(id: number) {
    return prismaClient.tool.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  static async hardDelete(id: number) {
    return prismaClient.tool.delete({ where: { id } });
  }

  static async findDeleted(id: number) {
    return prismaClient.tool.findFirst({
      where: {
        id,
        deleted_at: { not: null },
      },
    });
  }

  static async findNotDeleted(id: number) {
    return prismaClient.tool.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }
}
