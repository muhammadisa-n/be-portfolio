import { prismaClient } from "../config/database";

export class MessageRepository {
  static async create(data: any) {
    return prismaClient.message.create({ data });
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.message.findMany({
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
    return prismaClient.message.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: string) {
    return prismaClient.message.findUnique({ where: { id } });
  }

  static async update(id: string, data: any) {
    return prismaClient.message.update({ where: { id }, data });
  }

  static async softDelete(id: string) {
    return prismaClient.message.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  static async restore(id: string) {
    return prismaClient.message.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  static async hardDelete(id: string) {
    return prismaClient.message.delete({ where: { id } });
  }

  static async findDeleted(id: string) {
    return prismaClient.message.findFirst({
      where: {
        id,
        deleted_at: { not: null },
      },
    });
  }

  static async findNotDeleted(id: string) {
    return prismaClient.message.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }
}
