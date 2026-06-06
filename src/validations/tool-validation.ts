import { z, ZodType } from "zod";
const ToolTypeEnum = z.enum([
  "language",
  "runtime",
  "framework",
  "database",
  "tools",
]);
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
    type: z.preprocess((v) => (v === null ? undefined : v), ToolTypeEnum),
    show: z.boolean().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tool_url: z.string().optional(),
    type: ToolTypeEnum.optional(),
    show: z.boolean().optional(),
  });
  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
