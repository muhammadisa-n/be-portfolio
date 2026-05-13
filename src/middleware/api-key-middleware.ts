import { NextFunction, Response } from "express";
import { errorResponse } from "../utils/response";
import { UserRequest } from "../types/type-request";
import { env } from "../config/env";

export const apiKeyMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.get("x-api-key");
  if (!apiKey || apiKey !== env.APP_KEY) {
    return res
      .status(403)
      .json(errorResponse("Forbidden: Token Tidak Valid.", 403));
  }
  next();
};
