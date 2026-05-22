import { FileVersion, Type } from "@prisma/client";
import { prismaClient } from "../config/database";

export class FileRepository {
  static async findByType(type: Type) {
    return prismaClient.file.findFirst({
      where: {
        type,
        deleted_at: null,
      },
    });
  }

  static async updateByType(
    type: Type,
    data: {
      filename: string;
      mimetype: string;
      file_id: string;
      file_url: string;
    }
  ) {
    return prismaClient.file.updateMany({
      where: {
        type,
        deleted_at: null,
      },
      data,
    });
  }

  static async findByVersion(version: FileVersion) {
    return prismaClient.file.findUnique({
      where: {
        version,
        deleted_at: null,
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

  static async findNotDeleted(id: number) {
    return prismaClient.file.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }

  static async softDelete(id: number) {
    return prismaClient.file.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
