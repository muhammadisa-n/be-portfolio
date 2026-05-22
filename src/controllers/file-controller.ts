import { NextFunction, Request, Response } from "express";
import { FileService } from "../services/file-service";
import {
  errorResponse,
  successCreateResponse,
  successDeleteResponse,
  successResponse,
} from "../utils/response";
import { UploadedFile } from "express-fileupload";
import { CreateFileRequest, ListFileRequest } from "../dtos/file-dto";
import { FileVersion, Type } from "@prisma/client";
import axios from "axios";
export class FileController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const take = Number(req.query.take) || 10;
      const request: ListFileRequest = {
        page: page,
        take: take,
        skip: (page - 1) * take,
        name: req.query.name as string,
      };
      const response = await FileService.getAll(request);
      res
        .status(200)
        .json(successResponse("Berhasil Get All Data", 200, response));
    } catch (e) {
      next(e);
    }
  }

  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.files?.file;
      const request: CreateFileRequest = {
        type: req.body.type as Type,
        version: req.body.version as FileVersion | undefined,
      };

      if (!file) {
        res.status(400).json(errorResponse("File Belum Diupload", 400));
        return;
      }

      const fileUpload = Array.isArray(file) ? file[0] : file;

      const response = await FileService.upload(
        fileUpload as UploadedFile,
        request
      );

      res.status(200).json(successCreateResponse(response));
    } catch (error) {
      next(error);
    }
  }
  static async download(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const version = req.params.version as FileVersion;

      const file = await FileService.download(version);

      const cloudinaryResponse = await axios.get(file.file_url, {
        responseType: "stream",
      });

      res.setHeader("Content-Type", file.mimetype);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.filename}.pdf"`
      );

      cloudinaryResponse.data.pipe(res);
    } catch (error) {
      next(error);
    }
  }
  static async publicDownload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const version = req.params.version as FileVersion;

      const file = await FileService.download(version);

      res.redirect(file.file_url);
    } catch (error) {
      next(error);
    }
  }

  static async publicCheck(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const version = req.params.version as FileVersion;

      const file = await FileService.download(version);

      res.status(200).json(
        successResponse("File tersedia", 200, {
          url: file.file_url,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await FileService.softDelete(Number(id));
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
  static async getHeroImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const type = "HERO_IMAGE" as Type;

      const file = await FileService.getFileByType(type);
      res.status(200).json(
        successResponse("File tersedia", 200, {
          url: file,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
