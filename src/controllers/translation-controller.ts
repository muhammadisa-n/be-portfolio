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

  static async getSection(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TranslationService.getSection(req.params.section);

      res
        .status(200)
        .json(successResponse("Berhasil Get Section Content", 200, data));
    } catch (e) {
      next(e);
    }
  }

  static async updateSection(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TranslationService.updateSection(
        req.params.section,
        req.body
      );

      res
        .status(200)
        .json(successResponse("Berhasil Update Section Content", 200, data));
    } catch (e) {
      next(e);
    }
  }

  static async count(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TranslationService.count();
      res.status(200).json(successResponse("Berhasil Count Data", 200, data));
    } catch (e) {
      next(e);
    }
  }
}
