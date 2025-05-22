import { Request } from "express";
import { TranslationRepository } from "../repositories/translation-repository";

export class TranslationService {
  static async getAll(request: Request) {
    const lang = request.query.lang?.toString();
    const filters: any[] = [];

    if (lang) {
      filters.push({
        language: {
          contains: lang as string,
        },
      });
    }

    const data = await TranslationRepository.findMany(filters);

    // Convert array to key-value object
    const translationObj: Record<string, string> = {};
    data.forEach((item) => {
      translationObj[item.key] = item.value;
    });

    return translationObj;
  }
}
