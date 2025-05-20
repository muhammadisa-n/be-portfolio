import { z, ZodType } from "zod";

export class MessageValidation {
  static readonly CREATE: ZodType = z.object({
    fullName: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Nama Lengkap Wajib Diisi",
        })
        .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
        .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" })
    ),
    email: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Email Wajib Diisi",
        })
        .min(1, { message: "Email Tidak Boleh Kosong" })
        .email({ message: "Format Email Tidak Valid" })
    ),
    message: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Message Wajib Diisi",
        })
        .min(1, { message: "Message Tidak Boleh Kosong" })
    ),
  });

  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
