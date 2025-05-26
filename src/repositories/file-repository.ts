import { prismaClient } from "../config/database";

export class FileRepository {
  static async create(data: any) {
    return await prismaClient.file.create({ data });
  }

  static async findByFilename(filename: string) {
    return await prismaClient.file.findFirst({
      where: {
        filename: filename,
        deleted_at: null,
      },
    });
  }
  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.file.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
    });
  }

  static async count(filters: any) {
    return prismaClient.file.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: number) {
    return prismaClient.file.findUnique({ where: { id } });
  }

  static async update(id: number, data: any, tool_ids?: number[]) {
    return await prismaClient.file.update({
      where: { id },
      data,
    });
  }

  static async Delete(id: number) {
    return await prismaClient.file.delete({
      where: { id },
    });
  }
}
