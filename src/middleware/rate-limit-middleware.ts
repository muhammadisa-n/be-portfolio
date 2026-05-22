import rateLimit from "express-rate-limit";
import { errorResponse } from "../utils/response";
import { env } from "../config/env";

const isProduction = env.NODE_ENV === "production";

export const rateLimitMiddleware = rateLimit({
  windowMs: isProduction ? 5 * 60 * 1000 : 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res
      .status(429)
      .json(
        errorResponse(
          "Terlalu banyak request. Silakan coba lagi beberapa saat.",
          429
        )
      );
  },
});
