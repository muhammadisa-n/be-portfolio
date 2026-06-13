import { NextFunction, Request, Response } from "express";
import {
  errorResponse,
  successCreateResponse,
  successDeleteResponse,
  successResponse,
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
        name_en: req.body.name_en,
        name_id: req.body.name_id,
        description_en: req.body.description_en,
        description_id: req.body.description_id,
        project_url: req.body.project_url,
        demo_url: req.body.demo_url,
        show: req.body.show,
        tool_ids: JSON.parse(req.body.tool_ids),
      };

      const files = req.files?.images;

      if (!files) {
        res.status(400).json(errorResponse("Image Belum Diupload", 400));
        return;
      }

      const images = Array.isArray(files) ? files : [files];

      images.forEach((image) => validateImageFile(image));

      const response = await ProjectService.create(
        request,
        images as UploadedFile[]
      );
      images.forEach((image) => {
        if (image.tempFilePath) {
          fs.unlink(image.tempFilePath, (err) => {
            if (err) console.error("Gagal Hapus File Temp", err);
          });
        }
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
        name: req.query.name ? String(req.query.name) : undefined,
        language: req.query.language
          ? (String(req.query.language) as "en" | "id")
          : undefined,
        sortBy: req.query.sortBy
          ? (String(req.query.sortBy) as "created_at" | "name")
          : undefined,
        sortOrder: req.query.sortOrder
          ? (String(req.query.sortOrder) as "asc" | "desc")
          : undefined,
        show:
          req.query.show !== undefined
            ? String(req.query.show) === "true"
            : undefined,
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
        name_en: req.body.name_en,
        name_id: req.body.name_id,
        description_en: req.body.description_en,
        description_id: req.body.description_id,
        project_url: req.body.project_url,
        demo_url: req.body.demo_url,
        show: req.body.show,
        tool_ids: JSON.parse(req.body.tool_ids),
      };
      const files = req.files?.images;
      const images = files ? (Array.isArray(files) ? files : [files]) : [];

      images.forEach((image) => validateImageFile(image));

      const response = await ProjectService.update(
        request,
        Number(req.params.id),
        images as UploadedFile[]
      );
      images.forEach((image) => {
        if (image.tempFilePath) {
          fs.unlink(image.tempFilePath, (err) => {
            if (err) console.error("Gagal Hapus File Temp", err);
          });
        }
      });
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

  static async count(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProjectService.count();
      res.status(200).json(successResponse("Berhasil Count Data", 200, data));
    } catch (e) {
      next(e);
    }
  }
  static async deleteProjectImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await ProjectService.deleteProjectImage(
        Number(req.params.id),
        Number(req.params.imageId)
      );

      res.status(200).json(successDeleteResponse());
    } catch (error) {
      next(error);
    }
  }
  static async sortProjectImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await ProjectService.sortProjectImages(Number(req.params.id), req.body);

      res.status(200).json(successUpdateResponse(null));
    } catch (error) {
      next(error);
    }
  }
  static async addProjectImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = req.files?.images;
      const images = files ? (Array.isArray(files) ? files : [files]) : [];

      if (images.length === 0) {
        res.status(400).json(errorResponse("Image belum diupload", 400));
        return;
      }

      images.forEach((image) => validateImageFile(image));

      await ProjectService.addProjectImages(
        Number(req.params.id),
        images as UploadedFile[]
      );

      images.forEach((image) => {
        if (image.tempFilePath) {
          fs.unlink(image.tempFilePath, (err) => {
            if (err) console.error("Gagal Hapus File Temp", err);
          });
        }
      });

      res.status(201).json(successCreateResponse(null));
    } catch (error) {
      next(error);
    }
  }
}
