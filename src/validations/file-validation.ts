import { z, ZodType } from "zod";
import { Type, FileVersion } from "@prisma/client";

export class FileValidation {
  static readonly CREATE: ZodType = z.object({
    type: z.nativeEnum(Type, {
      required_error: "Type Wajib Diisi",
    }),
    version: z.nativeEnum(FileVersion).optional(),
  });
  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
