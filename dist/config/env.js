"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.parsed = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    APP_NAME: zod_1.z.string().default("Craft JS"),
    APP_SECRET: zod_1.z.string(),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    TZ: zod_1.z.string().default("Asia/Jakarta"),
    DATETIME_FORMAT: zod_1.z.string().default("dd-MM-yyyy HH:mm:ss"),
    DATABASE_URL: zod_1.z
        .string()
        .url({ message: "DATABASE_URL harus URL yang valid" }),
    BASE_URL: zod_1.z.string().url(),
    BASE_API_URL: zod_1.z.string().url(),
    CLIENT_URL: zod_1.z
        .string()
        .optional()
        .refine((val) => {
        if (!val)
            return true;
        return val.split(",").every((url) => {
            try {
                new URL(url.trim());
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }, {
        message: "CLIENT_URL harus berupa URL valid, dipisah koma jika lebih dari satu",
    }),
    PORT: zod_1.z.coerce.number().default(3000),
    JWT_SECRET: zod_1.z.string(),
    APP_KEY: zod_1.z.string(),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().optional(),
    CLOUDINARY_API_KEY: zod_1.z.string().optional(),
    CLOUDINARY_API_SECRET: zod_1.z.string().optional(),
    MAIL_HOST: zod_1.z.string(),
    MAIL_PORT: zod_1.z.string().default("587"),
    MAIL_USER: zod_1.z.string(),
    MAIL_PASS: zod_1.z.string(),
    MAIL_FROM: zod_1.z.string().optional(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("❌ ENV ERROR :", _env.error.format());
    process.exit(1);
}
exports.parsed = _env.data;
exports.env = Object.assign(Object.assign({}, exports.parsed), { CLIENT_URLS: exports.parsed.CLIENT_URL
        ? exports.parsed.CLIENT_URL.split(",").map((url) => url.trim())
        : [
            "http://localhost:8000",
            "http://localhost:5173",
            "http://localhost:3333",
            "http://localhost:3000",
        ] });
