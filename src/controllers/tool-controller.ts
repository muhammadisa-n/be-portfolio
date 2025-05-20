import { NextFunction, Request, Response } from "express";
import {
  errorResponse,
  successCreateResponse,
  successDeleteResponse,
  successResponse,
  successRestoreResponse,
  successUpdateResponse,
} from "../utils/response";
import {
  CreateToolRequest,
  ListToolRequest,
  UpdateToolRequest,
} from "../dtos/tool-dto";
import { ToolService } from "../services/tool-service";
import { UploadedFile } from "express-fileupload";
import { validateImageFile } from "../utils/upload-image";
import fs from "fs";

export class ToolController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateToolRequest = {
        name: req.body.name,
        description: req.body.description,
        tool_url: req.body.tool_url,
        dad: req.body.dad,
      };

      const file = req.files?.image;
      if (!file) {
        res.status(400).json(errorResponse("Image Belum Diupload", 400));
      }
      const image = Array.isArray(file) ? file[0] : file;
      validateImageFile(image!);
      const response = await ToolService.create(request, image as UploadedFile);
      fs.unlink(image!.tempFilePath, (err) => {
        if (err) console.error("Gagal Hapus File Temp", err);
      });
      res.status(201).json(successCreateResponse(response));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const take = Number(req.query.take) || 10;
      const request: ListToolRequest = {
        page: page,
        take: take,
        skip: (page - 1) * take,
        name: req.query.name as string,
      };
      const response = await ToolService.getAll(request);
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
      const response = await ToolService.getOne(Number(id));
      res
        .status(200)
        .json(successResponse("Berhasil Get Detail Data", 200, response));
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateToolRequest = {
        name: req.body.name,
        description: req.body.description,
        tool_url: req.body.tool_url,
        dad: req.body.dad,
      };
      const file = req.files?.image;
      const image = Array.isArray(file) ? file[0] : file;

      if (image) {
        validateImageFile(image);
      }
      const response = await ToolService.update(
        request,
        Number(req.params.id),
        image as UploadedFile
      );
      res.status(200).json(successUpdateResponse(response));
    } catch (error) {
      next(error);
    }
  }
  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ToolService.softDelete(Number(id));
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
  static async restoreData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ToolService.restoreData(Number(id));
      res.status(200).json(successRestoreResponse());
    } catch (e) {
      next(e);
    }
  }
  static async hardDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ToolService.hardDelete(Number(id));
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
}
