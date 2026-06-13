import { z, ZodType } from "zod";
const booleanFromFormData = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;

  return value;
}, z.boolean().optional());
export class UserValidation {
  static readonly LOGIN: ZodType = z.object({
    email: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Username Atau Email Wajib Diisi",
        })
        .min(1, { message: "Username Atau Email Tidak Boleh Kosong" })
        .max(100, { message: "Username Atau Email Maksimal 100 Karakter" })
    ),
    password: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Password Wajib Diisi",
        })
        .min(1, { message: "Password Minimal 1 Karakter" })
        .max(100, { message: "Password Maksimal 100 Karakter" })
    ),
    remember_me: booleanFromFormData,
  });

  static readonly LOGIN_GOOGLE: ZodType = z.object({
    code: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Credential Wajib Diisi",
        })
        .min(1, { message: "Credential Minimal 1 Karakter" })
    ),
    remember_me: booleanFromFormData,
  });

  static readonly UPDATE: ZodType = z.object({
    fullName: z
      .string({
        required_error: "Nama Lengkap Wajib Diisi",
      })
      .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
      .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" }),
    email: z
      .string({
        required_error: "Email Wajib Diisi",
      })
      .min(1, { message: "Email minimal 1 Karakter" })
      .max(100, { message: "Email Maksimal 100 Karakter" })
      .email({ message: "Format email tidak valid" })
      .optional(),
    password: z
      .string({
        required_error: "Password Wajib Diisi",
      })
      .min(8, { message: "Password minimal 8 Karakter" })
      .max(500, { message: "Password Maksimal 500 Karakter" })
      .optional(),
  });

  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
