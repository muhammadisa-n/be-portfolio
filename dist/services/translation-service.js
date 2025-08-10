"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const translation_repository_1 = require("../repositories/translation-repository");
class TranslationService {
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const lang = (_a = request.query.lang) === null || _a === void 0 ? void 0 : _a.toString();
            const filters = [];
            if (lang) {
                filters.push({
                    language: {
                        contains: lang,
                    },
                });
            }
            const data = yield translation_repository_1.TranslationRepository.findMany(filters);
            // Convert array to key-value object
            const translationObj = {};
            data.forEach((item) => {
                translationObj[item.key] = item.value;
            });
            return translationObj;
        });
    }
}
exports.TranslationService = TranslationService;
