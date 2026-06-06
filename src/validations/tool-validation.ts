import { z, ZodType } from "zod";
const ToolTypeEnum = z.enum([
  "language",
  "runtime",
  "framework",
  "database",
  "tools",
]);
const booleanFromFormData = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;

  return value;
}, z.boolean().optional());
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
    show: booleanFromFormData,
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tool_url: z.string().optional(),
    type: ToolTypeEnum.optional(),
    show: booleanFromFormData,
  });
  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
