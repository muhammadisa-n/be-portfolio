import { prismaClient } from "../config/database";

export class TranslationRepository {
  static async findMany(filters: any) {
    return prismaClient.translation.findMany({
      where: {
        AND: filters,
      },
    });
  }

  static async findByKeys(keys: string[]) {
    return prismaClient.translation.findMany({
      where: {
        key: {
          in: keys,
        },
        language: {
          in: ["en", "id"],
        },
      },
    });
  }

  static async upsertMany(contents: { key: string; en: string; id: string }[]) {
    return prismaClient.$transaction(
      contents.flatMap((item) => [
        prismaClient.translation.upsert({
          where: {
            language_key: {
              language: "en",
              key: item.key,
            },
          },
          update: {
            value: item.en,
          },
          create: {
            language: "en",
            key: item.key,
            value: item.en,
          },
        }),
        prismaClient.translation.upsert({
          where: {
            language_key: {
              language: "id",
              key: item.key,
            },
          },
          update: {
            value: item.id,
          },
          create: {
            language: "id",
            key: item.key,
            value: item.id,
          },
        }),
      ])
    );
  }

  static async countAll() {
    return prismaClient.translation.count();
  }
}
