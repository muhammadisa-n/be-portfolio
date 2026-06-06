import { z, ZodType } from "zod";

export class ProjectValidation {
  static readonly CREATE: ZodType = z.object({
    name_en: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Nama Eng Wajib Diisi",
        })
        .min(1, { message: "Nama  Eng Tidak Boleh Kosong" })
        .max(100, { message: "Nama Eng Maksimal 100 Karakter" })
    ),
    name_id: z
      .preprocess(
        (v) => (v === null ? undefined : v),
        z
          .string({
            required_error: "Nama ID Wajib Diisi",
          })
          .min(1, { message: "Nama ID Tidak Boleh Kosong" })
          .max(100, { message: "Nama ID Maksimal 100 Karakter" })
      )
      .nullable()
      .optional(),
    description_en: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Deskripsi Eng Wajib Diisi",
        })
        .min(1, { message: "Deskripsi  Eng Tidak Boleh Kosong" })
        .max(100, { message: "Deskripsi Eng Maksimal 100 Karakter" })
    ),
    description_id: z
      .preprocess(
        (v) => (v === null ? undefined : v),
        z
          .string({
            required_error: "Deskripsi ID Wajib Diisi",
          })
          .min(1, { message: "Deskripsi ID Tidak Boleh Kosong" })
          .max(100, { message: "Deskripsi ID Maksimal 100 Karakter" })
      )
      .nullable()
      .optional(),
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
    name_en: z.string().optional(),
    name_id: z.string().optional(),
    description_en: z.string().optional(),
    description_id: z.string().optional(),
    tool_url: z.string().optional(),
    demo_url: z.string().optional(),
    project_url: z.string().optional(),
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
