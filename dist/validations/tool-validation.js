"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolValidation = void 0;
const zod_1 = require("zod");
class ToolValidation {
}
exports.ToolValidation = ToolValidation;
ToolValidation.CREATE = zod_1.z.object({
    name: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Nama Wajib Diisi",
    })
        .min(1, { message: "Nama Tidak Boleh Kosong" })
        .max(100, { message: "Nama Maksimal 100 Karakter" })),
    description: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Deskripsi Wajib Diisi",
    })
        .min(1, { message: "Deskripsi Tidak Boleh Kosong" })),
    tool_url: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Tool Url Wajib Diisi",
    })
        .min(1, { message: "Tool Url Tidak Boleh Kosong" })),
    dad: zod_1.z
        .preprocess((val) => {
        if (val === "" || val === undefined || val === null)
            return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, zod_1.z.number().nullable())
        .optional(),
});
ToolValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tool_url: zod_1.z.string().optional(),
    dad: zod_1.z
        .preprocess((val) => {
        if (val === "" || val === undefined || val === null)
            return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, zod_1.z.number().nullable())
        .optional(),
});
ToolValidation.LIST = zod_1.z.object({
    page: zod_1.z.number().min(1).positive(),
    take: zod_1.z.number().min(1).positive(),
    skip: zod_1.z.number(),
    name: zod_1.z.string().optional(),
});
