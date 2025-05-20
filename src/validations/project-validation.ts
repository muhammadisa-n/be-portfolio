import { z, ZodType } from "zod";

export class ProjectValidation {
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
    demo_url: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Demo Url Wajib Diisi",
        })
        .min(1, { message: "Demo Url Tidak Boleh Kosong" })
    ),
    project_url: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Project Url Wajib Diisi",
        })
        .min(1, { message: "Project Url Tidak Boleh Kosong" })
    ),
    dad: z
      .preprocess((val) => {
        if (val === "" || val === undefined || val === null) return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      }, z.number().nullable())
      .optional(),
    tool_ids: z.preprocess(
      (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return [];
          }
        }
        return val;
      },
      z
        .array(z.number({ invalid_type_error: "Tool ID harus berupa angka" }))
        .min(1, { message: "Minimal 1 Tool harus dipilih" })
    ),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tool_url: z.string().optional(),
    demo_url: z.string().optional(),
    project_url: z.string().optional(),
    dad: z
      .preprocess((val) => {
        if (val === "" || val === undefined || val === null) return null;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      }, z.number().nullable())
      .optional(),
    tool_ids: z
      .preprocess(
        (val) => {
          if (val === undefined || val === null || val === "") return undefined; // agar tidak divalidasi sama sekali
          if (typeof val === "string") {
            try {
              return JSON.parse(val);
            } catch {
              return [];
            }
          }
          return val;
        },
        z
          .array(z.number({ invalid_type_error: "Tool ID harus berupa angka" }))
          .min(1, { message: "Minimal 1 Tool harus dipilih" })
      )
      .optional(),
  });
  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
