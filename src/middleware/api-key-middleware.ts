import { NextFunction, Request, Response } from "express";
import { timingSafeEqual } from "crypto";
import { env } from "../config/env";
import { ResponseError } from "../utils/response-error";

const API_KEY_HEADER = "x-api-key";
const INVALID_API_KEY_MESSAGE = "Unauthorized: App Key Tidak Valid.";

const isValidApiKey = (incomingApiKey: string, expectedApiKey: string) => {
  const incomingApiKeyBuffer = Buffer.from(incomingApiKey);
  const expectedApiKeyBuffer = Buffer.from(expectedApiKey);

  return (
    incomingApiKeyBuffer.length === expectedApiKeyBuffer.length &&
    timingSafeEqual(incomingApiKeyBuffer, expectedApiKeyBuffer)
  );
};

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appKey = req.get(API_KEY_HEADER)?.trim();

  if (!appKey || !env.APP_KEY || !isValidApiKey(appKey, env.APP_KEY)) {
    return next(new ResponseError(401, INVALID_API_KEY_MESSAGE));
  }

  return next();
};
