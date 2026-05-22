import { prismaClient } from "../config/database";
import {
  BulkTrashRequest,
  ListTrashRequest,
  TrashType,
} from "../dtos/trash-dto";
import { TrashRepository } from "../repositories/trash-repository";
import { ResponseError } from "../utils/response-error";
import { deleteCloudinaryFile } from "../utils/upload";

export class TrashService {
  static async getAll(request: ListTrashRequest) {
    const take = request.take || 10;

    const data = await TrashRepository.findMany(take, request.cursor);

    const hasMore = data.length > take;
    const result = hasMore ? data.slice(0, take) : data;

    const lastItem = result[result.length - 1];

    return {
      data: result,
      next_cursor: lastItem ? lastItem.deleted_at : null,
      has_more: hasMore,
    };
  }

  static async bulkRestore(request: BulkTrashRequest) {
    return prismaClient.$transaction(async () => {
      const results = [];

      for (const item of request.items) {
        const log = await TrashRepository.findLog(item.type, item.id);

        if (!log) {
          throw new ResponseError(
            404,
            `Data ${item.type} dengan id ${item.id} tidak ditemukan di trash`
          );
        }

        const entity = await TrashRepository.findDeletedEntity(
          item.type,
          item.id
        );

        if (!entity) {
          throw new ResponseError(
            404,
            `Data ${item.type} dengan id ${item.id} tidak ditemukan`
          );
        }

        await TrashRepository.restoreEntity(item.type, item.id);
        await TrashRepository.deleteLog(item.type, item.id);

        results.push({
          type: item.type,
          id: item.id,
          status: "restored",
        });
      }

      return results;
    });
  }

  static async bulkHardDelete(request: BulkTrashRequest) {
    return prismaClient.$transaction(async () => {
      const results = [];

      for (const item of request.items) {
        const log = await TrashRepository.findLog(item.type, item.id);

        if (!log) {
          throw new ResponseError(
            404,
            `Data ${item.type} dengan id ${item.id} tidak ditemukan di trash`
          );
        }

        const entity = await TrashRepository.findDeletedEntity(
          item.type,
          item.id
        );

        if (!entity) {
          throw new ResponseError(
            404,
            `Data ${item.type} dengan id ${item.id} tidak ditemukan`
          );
        }

        await TrashService.deleteAssetIfExists(item.type, entity);
        await TrashRepository.hardDeleteEntity(item.type, item.id);
        await TrashRepository.deleteLog(item.type, item.id);

        results.push({
          type: item.type,
          id: item.id,
          status: "hard_deleted",
        });
      }

      return results;
    });
  }

  static getTrashTitle(type: TrashType, data: any) {
    if (type === "user") return data.fullName;
    if (type === "tool") return data.name;
    if (type === "project") return data.name;
    if (type === "message") return data.fullName;
    if (type === "file") return data.filename;

    return "Unknown";
  }

  static getTrashSubtitle(type: TrashType, data: any) {
    if (type === "user") return data.email;
    if (type === "tool") return data.description;
    if (type === "project") return data.description;
    if (type === "message") return data.email;
    if (type === "file") return data.mimetype;

    return null;
  }

  static getTrashImage(type: TrashType, data: any) {
    if (type === "user") return data.image_url;
    if (type === "tool") return data.image_url;
    if (type === "project") return data.image_url;
    if (type === "file") return data.file_url;

    return null;
  }
  static async deleteAssetIfExists(type: TrashType, data: any) {
    try {
      if (["user", "tool", "project"].includes(type) && data.image_id) {
        await deleteCloudinaryFile(data.image_id);
      }

      if (type === "file" && data.file_id) {
        await deleteCloudinaryFile(data.file_id);
      }
    } catch (error) {
      console.error("Gagal hapus asset Cloudinary:", error);
    }
  }
}
