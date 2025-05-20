import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  APP_NAME: z.string().default("Craft JS"),
  APP_SECRET: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  TZ: z.string().default("Asia/Jakarta"),
  DATETIME_FORMAT: z.string().default("dd-MM-yyyy HH:mm:ss"),
  DATABASE_URL: z
    .string()
    .url({ message: "DATABASE_URL harus URL yang valid" }),
  BASE_URL: z.string().url(),
  BASE_API_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  APP_KEY: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ ENV ERROR:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
