"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidation = void 0;
const zod_1 = require("zod");
class MessageValidation {
}
exports.MessageValidation = MessageValidation;
MessageValidation.CREATE = zod_1.z.object({
    fullName: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Nama Lengkap Wajib Diisi",
    })
        .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
        .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" })),
    email: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Email Wajib Diisi",
    })
        .min(1, { message: "Email Tidak Boleh Kosong" })
        .email({ message: "Format Email Tidak Valid" })),
    message: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Message Wajib Diisi",
    })
        .min(1, { message: "Message Tidak Boleh Kosong" })),
});
MessageValidation.LIST = zod_1.z.object({
    page: zod_1.z.number().min(1).positive(),
    take: zod_1.z.number().min(1).positive(),
    skip: zod_1.z.number(),
    name: zod_1.z.string().optional(),
});
