import { prismaClient } from "../config/database";

export class ProjectImageRepository {
  static async findImageById(projectId: number, imageId: number) {
    return prismaClient.projectImage.findFirst({
      where: {
        id: imageId,
        project_id: projectId,
      },
    });
  }

  static async deleteImageById(projectId: number, imageId: number) {
    return prismaClient.projectImage.delete({
      where: {
        id: imageId,
      },
    });
  }

  static async updateImageSort(
    projectId: number,
    images: { id: number; sort_order: number }[]
  ) {
    return prismaClient.$transaction(
      images.map((image) =>
        prismaClient.projectImage.updateMany({
          where: {
            id: image.id,
            project_id: projectId,
          },
          data: {
            sort_order: image.sort_order,
          },
        })
      )
    );
  }

  static async addImages(
    projectId: number,
    images: {
      image_id: string;
      image_url: string;
      sort_order: number;
    }[]
  ) {
    return prismaClient.projectImage.createMany({
      data: images.map((image) => ({
        project_id: projectId,
        image_id: image.image_id,
        image_url: image.image_url,
        sort_order: image.sort_order,
      })),
    });
  }

  static async countProjectImages(projectId: number) {
    return prismaClient.projectImage.count({
      where: {
        project_id: projectId,
      },
    });
  }

  static async findImagesByProjectId(projectId: number) {
    return prismaClient.projectImage.findMany({
      where: {
        project_id: projectId,
      },
      orderBy: {
        sort_order: "asc",
      },
    });
  }
}
