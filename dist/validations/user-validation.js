"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
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
        .max(100, { message: "Email Maksimal 100 Karakter" })
        .email({ message: "Format Email Tidak Valid" })),
    password: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Kata Sandi Wajib Diisi",
    })
        .min(8, { message: "Kata Sandi Minimal 8 Karakter" })
        .max(100, { message: "Kata Sandi Maksimal 100 Karakter" })),
    as: zod_1.z.string().optional(),
});
UserValidation.CREATE = zod_1.z.object({
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
        .max(100, { message: "Email Maksimal 100 Karakter" })
        .email({ message: "Format email tidak valid" })),
    password: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Kata Sandi Wajib Diisi",
    })
        .min(8, { message: "Kata Sandi Minimal 8 Karakter" })
        .max(100, { message: "Kata Sandi Maksimal 100 Karakter" })),
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Username Atau Email Wajib Diisi",
    })
        .min(1, { message: "Username Atau Email Tidak Boleh Kosong" })
        .max(100, { message: "Username Atau Email Maksimal 100 Karakter" })),
    password: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Password Wajib Diisi",
    })
        .min(1, { message: "Password Minimal 1 Karakter" })
        .max(100, { message: "Password Maksimal 100 Karakter" })),
    redirect_url: zod_1.z.preprocess((v) => (v === null ? undefined : v), zod_1.z
        .string({
        required_error: "Redirect URL Wajib Diisi",
    })
        .optional()),
    rememberMe: zod_1.z.boolean().default(false).optional(),
});
UserValidation.UPDATE = zod_1.z.object({
    fullName: zod_1.z
        .string({
        required_error: "Nama Lengkap Wajib Diisi",
    })
        .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
        .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" }),
    email: zod_1.z
        .string({
        required_error: "Email Wajib Diisi",
    })
        .min(1, { message: "Email minimal 1 Karakter" })
        .max(100, { message: "Email Maksimal 100 Karakter" })
        .email({ message: "Format email tidak valid" })
        .optional(),
    password: zod_1.z
        .string({
        required_error: "Password Wajib Diisi",
    })
        .min(8, { message: "Password minimal 8 Karakter" })
        .max(500, { message: "Password Maksimal 500 Karakter" })
        .optional(),
});
UserValidation.LIST = zod_1.z.object({
    page: zod_1.z.number().min(1).positive(),
    take: zod_1.z.number().min(1).positive(),
    skip: zod_1.z.number(),
    name: zod_1.z.string().optional(),
});
