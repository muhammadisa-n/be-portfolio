import { FileVersion } from "@prisma/client";
import { prismaClient } from "../config/database";

export class FileRepository {
  static async findByVersion(version: FileVersion) {
    return prismaClient.file.findUnique({
      where: {
        version,
      },
    });
  }
  static async create(data: any) {
    return await prismaClient.file.create({ data });
  }

  static async updateByVersion(
    version: FileVersion,
    data: {
      filename: string;
      mimetype: string;
      file_id: string;
      file_url: string;
    }
  ) {
    return prismaClient.file.update({
      where: {
        version,
      },
      data,
    });
  }
  static async findById(id: number) {
    return await prismaClient.file.findFirst({
      where: {
        id: id,
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

  static async findByIdx(id: number) {
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
