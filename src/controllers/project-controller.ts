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
  CreateProjectRequest,
  ListProjectRequest,
  UpdateProjectRequest,
} from "../dtos/project-dto";
import { UploadedFile } from "express-fileupload";
import { validateImageFile } from "../utils/upload";
import fs from "fs";
import { ProjectService } from "../services/project-service";

export class ProjectController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProjectRequest = {
        name: req.body.name,
        description: req.body.description,
        demo_url: req.body.demo_url,
        project_url: req.body.project_url,
        dad: req.body.dad,
        tool_ids: JSON.parse(req.body.tool_ids),
      };

      const file = req.files?.image;
      if (!file) {
        res.status(400).json(errorResponse("Image Belum Diupload", 400));
      }
      const image = Array.isArray(file) ? file[0] : file;
      validateImageFile(image!);
      const response = await ProjectService.create(
        request,
        image as UploadedFile
      );
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
      const request: ListProjectRequest = {
        page: page,
        take: take,
        skip: (page - 1) * take,
        name: req.query.name as string,
      };
      const response = await ProjectService.getAll(request);
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
      const response = await ProjectService.getOne(Number(id));
      res
        .status(200)
        .json(successResponse("Berhasil Get Detail Data", 200, response));
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateProjectRequest = {
        name: req.body.name,
        description: req.body.description,
        demo_url: req.body.demo_url,
        project_url: req.body.project_url,
        dad: req.body.dad,
        tool_ids: JSON.parse(req.body.tool_ids),
      };
      const file = req.files?.image;
      const image = Array.isArray(file) ? file[0] : file;

      if (image) {
        validateImageFile(image);
      }
      const response = await ProjectService.update(
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
      await ProjectService.softDelete(Number(id));
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
  static async restoreData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ProjectService.restoreData(Number(id));
      res.status(200).json(successRestoreResponse());
    } catch (e) {
      next(e);
    }
  }
  static async hardDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ProjectService.hardDelete(Number(id));
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
}
