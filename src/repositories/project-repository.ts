import { prismaClient } from "../config/database";
import { ResponseError } from "../utils/response-error";

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
  static async createWithTranslation(data: {
    name_en: string;
    description_en: string;
    name_id?: string;
    description_id?: string;
    demo_url: string;
    project_url: string;
    dad?: number;
    tool_ids: number[];
    image_id: string;
    image_url: string;
  }) {
    return prismaClient.$transaction(async (tx) => {
      const createdProject = await tx.project.create({
        data: {
          name: "TEMP_NAME",
          description: "TEMP_DESCRIPTION",
          demo_url: data.demo_url,
          project_url: data.project_url,
          dad: data.dad,
          image_id: data.image_id,
          image_url: data.image_url,
        },
      });

      const nameKey = `projects.${createdProject.id}.name`;
      const descriptionKey = `projects.${createdProject.id}.description`;

      const updatedProject = await tx.project.update({
        where: {
          id: createdProject.id,
        },
        data: {
          name: nameKey,
          description: descriptionKey,
        },
      });

      const translations = [
        {
          language: "en",
          key: nameKey,
          value: data.name_en,
        },
        {
          language: "en",
          key: descriptionKey,
          value: data.description_en,
        },
      ];

      if (data.name_id?.trim()) {
        translations.push({
          language: "id",
          key: nameKey,
          value: data.name_id.trim(),
        });
      }

      if (data.description_id?.trim()) {
        translations.push({
          language: "id",
          key: descriptionKey,
          value: data.description_id.trim(),
        });
      }

      await tx.translation.createMany({
        data: translations,
      });

      if (data.tool_ids.length > 0) {
        await tx.projectHasTool.createMany({
          data: data.tool_ids.map((toolId) => ({
            project_id: createdProject.id,
            tool_id: toolId,
          })),
          skipDuplicates: true,
        });
      }

      return updatedProject;
    });
  }
  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.project.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
      orderBy: {
        created_at: "asc",
      },
      include: {
        project_has_tool: {
          orderBy: [
            {
              tool: {
                sort_order: "asc",
              },
            },
            {
              tool: {
                name: "asc",
              },
            },
          ],
          include: {
            tool: {
              select: {
                name: true,
                tool_url: true,
                type: true,
                sort_order: true,
              },
            },
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
  static async countAll() {
    return prismaClient.project.count({
      where: {
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

  static async updateWithTransaction(
    id: number,
    data: {
      name_en?: string;
      name_id?: string;
      description_en?: string;
      description_id?: string;
      demo_url?: string;
      project_url?: string;
      dad?: number | null;
      image_id?: string;
      image_url?: string;
      tool_ids?: number[];
    }
  ) {
    return prismaClient.$transaction(
      async (tx) => {
        const project = await tx.project.findUnique({
          where: { id },
        });

        if (!project) {
          throw new ResponseError(404, "Project tidak ditemukan");
        }

        const updateProjectData: any = {};

        if (data.demo_url !== undefined) {
          updateProjectData.demo_url = data.demo_url;
        }

        if (data.project_url !== undefined) {
          updateProjectData.project_url = data.project_url;
        }

        if (data.dad !== undefined) {
          updateProjectData.dad = data.dad;
        }

        if (data.image_id !== undefined) {
          updateProjectData.image_id = data.image_id;
        }

        if (data.image_url !== undefined) {
          updateProjectData.image_url = data.image_url;
        }

        const updatedProject = await tx.project.update({
          where: { id },
          data: updateProjectData,
        });

        const nameKey = project.name;
        const descriptionKey = project.description;

        if (data.name_en?.trim()) {
          await tx.translation.upsert({
            where: {
              language_key: {
                language: "en",
                key: nameKey,
              },
            },
            update: {
              value: data.name_en.trim(),
            },
            create: {
              language: "en",
              key: nameKey,
              value: data.name_en.trim(),
            },
          });
        }

        if (data.description_en?.trim()) {
          await tx.translation.upsert({
            where: {
              language_key: {
                language: "en",
                key: descriptionKey,
              },
            },
            update: {
              value: data.description_en.trim(),
            },
            create: {
              language: "en",
              key: descriptionKey,
              value: data.description_en.trim(),
            },
          });
        }

        if (data.name_id?.trim()) {
          await tx.translation.upsert({
            where: {
              language_key: {
                language: "id",
                key: nameKey,
              },
            },
            update: {
              value: data.name_id.trim(),
            },
            create: {
              language: "id",
              key: nameKey,
              value: data.name_id.trim(),
            },
          });
        }

        if (data.description_id?.trim()) {
          await tx.translation.upsert({
            where: {
              language_key: {
                language: "id",
                key: descriptionKey,
              },
            },
            update: {
              value: data.description_id.trim(),
            },
            create: {
              language: "id",
              key: descriptionKey,
              value: data.description_id.trim(),
            },
          });
        }

        if (Array.isArray(data.tool_ids)) {
          await tx.projectHasTool.deleteMany({
            where: {
              project_id: id,
            },
          });

          if (data.tool_ids.length > 0) {
            await tx.projectHasTool.createMany({
              data: data.tool_ids.map((toolId) => ({
                project_id: id,
                tool_id: toolId,
              })),
              skipDuplicates: true,
            });
          }
        }

        return updatedProject;
      },
      {
        timeout: 15000,
        maxWait: 10000,
      }
    );
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
