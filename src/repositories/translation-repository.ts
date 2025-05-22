import { prismaClient } from "../config/database";

export class TranslationRepository {
  static async findMany(filters: any) {
    return prismaClient.translation.findMany({
      where: {
        AND: filters,
      },
    });
  }
}
