"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const zod_1 = require("zod");
class ProjectValidation {
}
exports.ProjectValidation = ProjectValidation;
ProjectValidation.CREATE = zod_1.z.object({
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
    demo_url: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Demo Url Wajib Diisi",
    })
        .min(1, { message: "Demo Url Tidak Boleh Kosong" })),
    project_url: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Project Url Wajib Diisi",
    })
        .min(1, { message: "Project Url Tidak Boleh Kosong" })),
    dad: zod_1.z
        .preprocess((val) => {
        if (val === "" || val === undefined || val === null)
            return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, zod_1.z.number().nullable())
        .optional(),
    tool_ids: zod_1.z.preprocess((val) => {
        if (typeof val === "string") {
            try {
                return JSON.parse(val);
            }
            catch (_a) {
                return [];
            }
        }
        return val;
    }, zod_1.z
        .array(zod_1.z.number({ invalid_type_error: "Tool ID harus berupa angka" }))
        .min(1, { message: "Minimal 1 Tool harus dipilih" })),
});
ProjectValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tool_url: zod_1.z.string().optional(),
    demo_url: zod_1.z.string().optional(),
    project_url: zod_1.z.string().optional(),
    dad: zod_1.z
        .preprocess((val) => {
        if (val === "" || val === undefined || val === null)
            return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }, zod_1.z.number().nullable())
        .optional(),
    tool_ids: zod_1.z
        .preprocess((val) => {
        if (val === undefined || val === null || val === "")
            return undefined; // agar tidak divalidasi sama sekali
        if (typeof val === "string") {
            try {
                return JSON.parse(val);
            }
            catch (_a) {
                return [];
            }
        }
        return val;
    }, zod_1.z
        .array(zod_1.z.number({ invalid_type_error: "Tool ID harus berupa angka" }))
        .min(1, { message: "Minimal 1 Tool harus dipilih" }))
        .optional(),
});
ProjectValidation.LIST = zod_1.z.object({
    page: zod_1.z.number().min(1).positive(),
    take: zod_1.z.number().min(1).positive(),
    skip: zod_1.z.number(),
    name: zod_1.z.string().optional(),
});
