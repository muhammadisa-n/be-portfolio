import { prismaClient } from "../config/database";

export class ProjectRepository {
  static async create(data: any, tool_ids: number[]) {
    const createdProject = await prismaClient.project.create({ data });
    if (tool_ids.length > 0) {
      await prismaClient.projectHasTool.createMany({
        data: tool_ids.map((toolId) => ({
          project_id: createdProject.id,
          tool_id: toolId,
        })),
        skipDuplicates: true,
      });
      return createdProject;
    }

    return createdProject;
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.project.findMany({
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
  }

  static async count(filters: any) {
    return prismaClient.project.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: number) {
    return prismaClient.project.findUnique({ where: { id } });
  }

  static async update(id: number, data: any, tool_ids?: number[]) {
    const updatedProject = await prismaClient.project.update({
      where: { id },
      data,
    });
    if (tool_ids && Array.isArray(tool_ids)) {
      await prismaClient.projectHasTool.deleteMany({
        where: { project_id: id },
      });
      if (tool_ids.length > 0) {
        await prismaClient.projectHasTool.createMany({
          data: tool_ids.map((toolId) => ({
            project_id: id,
            tool_id: toolId,
          })),
          skipDuplicates: true,
        });
      }
    }

    return updatedProject;
  }

  static async softDelete(id: number) {
    return prismaClient.project.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  static async restore(id: number) {
    return prismaClient.project.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  static async hardDelete(id: number) {
    return prismaClient.project.delete({ where: { id } });
  }

  static async findDeleted(id: number) {
    return prismaClient.project.findFirst({
      where: {
        id,
        deleted_at: { not: null },
      },
    });
  }

  static async findNotDeleted(id: number) {
    return prismaClient.project.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }
}
