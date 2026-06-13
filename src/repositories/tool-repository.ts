import { prismaClient } from "../config/database";

export class ToolRepository {
  static async create(data: any) {
    return prismaClient.tool.create({ data });
  }

  static async findMany(
    filters: any[],
    skip: number,
    take: number,
    sortBy?: "created_at" | "name" | "sort_order" | "type",
    sortOrder?: "asc" | "desc"
  ) {
    let orderBy: any[];

    if (!sortBy || !sortOrder) {
      orderBy = [{ sort_order: "asc" }, { name: "asc" }];
    } else if (sortBy === "sort_order") {
      orderBy = [{ sort_order: sortOrder }, { name: "asc" }];
    } else if (sortBy === "name") {
      orderBy = [{ name: sortOrder }, { sort_order: "asc" }];
    } else {
      orderBy = [
        { [sortBy]: sortOrder },
        { sort_order: "asc" },
        { name: "asc" },
      ];
    }

    return prismaClient.tool.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
      orderBy,
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

  static async countPublic(filters: any) {
    return prismaClient.tool.count({
      where: {
        AND: filters,
        show: true,
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

  static async findNotDeleted(id: number) {
    return prismaClient.tool.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }
  static async countAll() {
    return prismaClient.tool.count({
      where: {
        deleted_at: null,
      },
    });
  }
  static async findMostUsed(take: number) {
    const groupedTools = await prismaClient.projectHasTool.groupBy({
      by: ["tool_id"],
      where: {
        project: {
          deleted_at: null,
        },
        tool: {
          deleted_at: null,
          show: true,
        },
      },
      _count: {
        project_id: true,
      },
      orderBy: {
        _count: {
          project_id: "desc",
        },
      },
      take,
    });

    const toolIds = groupedTools.map((item) => item.tool_id);

    const tools = await prismaClient.tool.findMany({
      where: {
        id: {
          in: toolIds,
        },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        type: true,
        image_url: true,
        tool_url: true,
        sort_order: true,
      },
    });

    return groupedTools.map((item) => {
      const tool = tools.find((tool) => tool.id === item.tool_id);

      return {
        id: item.tool_id,
        name: tool?.name,
        type: tool?.type,
        image_url: tool?.image_url,
        tool_url: tool?.tool_url,
        sort_order: tool?.sort_order,
        total_projects: item._count.project_id,
      };
    });
  }
}
