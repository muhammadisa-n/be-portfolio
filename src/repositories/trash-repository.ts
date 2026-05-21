import { prismaClient } from "../config/database";
import { TrashType } from "../dtos/trash-dto";

export class TrashRepository {
  static getDelegate(type: TrashType): any {
    const delegates: Record<TrashType, any> = {
      user: prismaClient.user,
      tool: prismaClient.tool,
      project: prismaClient.project,
      message: prismaClient.message,
      file: prismaClient.file,
    };

    return delegates[type];
  }

  static async createLog(data: {
    entity_id: string;
    entity_type: TrashType;
    title: string;
    subtitle?: string;
    image_url?: string;
  }) {
    return prismaClient.trashLog.upsert({
      where: {
        entity_id_entity_type: {
          entity_id: data.entity_id,
          entity_type: data.entity_type,
        },
      },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        image_url: data.image_url,
        deleted_at: new Date(),
      },
      create: {
        entity_id: data.entity_id,
        entity_type: data.entity_type,
        title: data.title,
        subtitle: data.subtitle,
        image_url: data.image_url,
      },
    });
  }

  static async findMany(take: number, cursor?: string) {
    return prismaClient.trashLog.findMany({
      where: cursor
        ? {
            deleted_at: {
              lt: new Date(cursor),
            },
          }
        : {},
      take: take + 1,
      orderBy: {
        deleted_at: "desc",
      },
    });
  }

  static async findLog(type: TrashType, id: string) {
    return prismaClient.trashLog.findUnique({
      where: {
        entity_id_entity_type: {
          entity_id: id,
          entity_type: type,
        },
      },
    });
  }

  static async deleteLog(type: TrashType, id: string) {
    return prismaClient.trashLog.delete({
      where: {
        entity_id_entity_type: {
          entity_id: id,
          entity_type: type,
        },
      },
    });
  }

  static async findDeletedEntity(type: TrashType, id: string) {
    const delegate = this.getDelegate(type);

    return delegate.findFirst({
      where: {
        id: this.normalizeId(type, id),
        deleted_at: {
          not: null,
        },
      },
    });
  }

  static async restoreEntity(type: TrashType, id: string) {
    const delegate = this.getDelegate(type);

    return delegate.update({
      where: {
        id: this.normalizeId(type, id),
      },
      data: {
        deleted_at: null,
      },
    });
  }

  static async hardDeleteEntity(type: TrashType, id: string) {
    const delegate = this.getDelegate(type);

    return delegate.delete({
      where: {
        id: this.normalizeId(type, id),
      },
    });
  }

  static normalizeId(type: TrashType, id: string) {
    const numberIdTypes: TrashType[] = ["tool", "project", "file"];

    if (numberIdTypes.includes(type)) {
      return Number(id);
    }

    return id;
  }
}
