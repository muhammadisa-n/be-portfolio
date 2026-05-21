import { NextFunction, Request, Response } from "express";
import {
  successDeleteResponse,
  successResponse,
  successRestoreResponse,
} from "../utils/response";
import { TrashService } from "../services/trash-service";

export class TrashController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const take = Number(req.query.take) || 10;
      const cursor = req.query.cursor as string | undefined;

      const response = await TrashService.getAll({
        take,
        cursor,
      });

      res
        .status(200)
        .json(successResponse("Berhasil Get Data Trash", 200, response));
    } catch (e) {
      next(e);
    }
  }

  static async bulkRestore(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TrashService.bulkRestore(req.body);

      res.status(200).json(successRestoreResponse());
    } catch (e) {
      next(e);
    }
  }

  static async bulkHardDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TrashService.bulkHardDelete(req.body);

      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
}
