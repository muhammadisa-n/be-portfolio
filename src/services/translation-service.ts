import { Request } from "express";
import { TranslationRepository } from "../repositories/translation-repository";
import { translationSections } from "../types/translation-section";
import { ResponseError } from "../utils/response-error";

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

  static async getSection(section: string) {
    const selectedSection =
      translationSections[section as keyof typeof translationSections];

    if (!selectedSection) {
      throw new ResponseError(404, "Section tidak ditemukan");
    }

    const translations = await TranslationRepository.findByKeys(
      selectedSection.keys
    );

    return {
      section,
      title: selectedSection.title,
      contents: selectedSection.keys.map((key) => ({
        key,
        en:
          translations.find(
            (item) => item.key === key && item.language === "en"
          )?.value || "",
        id:
          translations.find(
            (item) => item.key === key && item.language === "id"
          )?.value || "",
      })),
    };
  }
  static async updateSection(
    section: string,
    payload: { contents: { key: string; en: string; id: string }[] }
  ) {
    const selectedSection =
      translationSections[section as keyof typeof translationSections];

    if (!selectedSection) {
      throw new ResponseError(404, "Section tidak ditemukan");
    }

    for (const item of payload.contents) {
      if (!selectedSection.keys.includes(item.key)) {
        throw new ResponseError(
          400,
          `Key ${item.key} tidak termasuk section ${section}`
        );
      }
    }

    await TranslationRepository.upsertMany(payload.contents);

    return {
      section,
      contents: payload.contents,
    };
  }
  static async count() {
    const data = await TranslationRepository.countAll();
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return data;
  }
}
