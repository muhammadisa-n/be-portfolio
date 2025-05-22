import { NextFunction, Request, Response } from "express";
import { TranslationService } from "../services/translation-service";
import { successResponse } from "../utils/response";

export class TranslationController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TranslationService.getAll(req);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
