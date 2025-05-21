import { NextFunction, Request, Response } from "express";
import {
  successCreateResponse,
  successDeleteResponse,
  successResponse,
  successRestoreResponse,
} from "../utils/response";
import { CreateMessageRequest, ListMessageRequest } from "../dtos/message-dto";
import { MessageService } from "../services/message-service";
import { sendEmail } from "../utils/sendEmail";

export class MessageController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateMessageRequest = {
        fullName: req.body.fullName,
        email: req.body.email,
        message: req.body.message,
      };
      const response = await MessageService.create(request);
      await sendEmail(response);
      res
        .status(201)
        .json(successResponse("Message Berhasil Terkirim", 201, response));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const take = Number(req.query.take) || 10;
      const request: ListMessageRequest = {
        page: page,
        take: take,
        skip: (page - 1) * take,
        name: req.query.name as string,
      };
      const response = await MessageService.getAll(request);
      res
        .status(200)
        .json(successResponse("Berhasil Get All Data", 200, response));
    } catch (e) {
      next(e);
    }
  }
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await MessageService.getOne(id);
      res
        .status(200)
        .json(successResponse("Berhasil Get Detail Data", 200, response));
    } catch (e) {
      next(e);
    }
  }

  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await MessageService.softDelete(id);
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
  static async restoreData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await MessageService.restoreData(id);
      res.status(200).json(successRestoreResponse());
    } catch (e) {
      next(e);
    }
  }
  static async hardDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await MessageService.hardDelete(id);
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
}
