import { z, ZodType } from "zod";

export class ToolValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Nama Wajib Diisi",
        })
        .min(1, { message: "Nama Tidak Boleh Kosong" })
        .max(100, { message: "Nama Maksimal 100 Karakter" })
    ),
    description: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Deskripsi Wajib Diisi",
        })
        .min(1, { message: "Deskripsi Tidak Boleh Kosong" })
    ),
    tool_url: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Tool Url Wajib Diisi",
        })
        .min(1, { message: "Tool Url Tidak Boleh Kosong" })
    ),
    dad: z
      .preprocess((val) => {
        if (val === "" || val === undefined || val === null) return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      }, z.number().nullable())
      .optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tool_url: z.string().optional(),
    dad: z
      .preprocess((val) => {
        if (val === "" || val === undefined || val === null) return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      }, z.number().nullable())
      .optional(),
  });
  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
