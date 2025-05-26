import { NextFunction, Request, Response } from "express";
import { FileService } from "../services/file-service";
import { errorResponse, successCreateResponse } from "../utils/response";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
export class FileController {
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.files?.file;
      if (!file) {
        res.status(400).json(errorResponse("File Belum Diupload", 400));
      }
      const fileUpload = Array.isArray(file) ? file[0] : file;

      const response = await FileService.upload(fileUpload as UploadedFile);
      fs.unlink(fileUpload!.tempFilePath, (err) => {
        if (err) console.error("Gagal Hapus File Temp", err);
      });
      res.status(200).json(successCreateResponse(response));
    } catch (error) {
      next(error);
    }
  }
  static async download(req: Request, res: Response, next: NextFunction) {
    try {
      const filename = req.params.id;
      const file = await FileService.download(filename);

      if (!file) {
        res.status(404).json(errorResponse("File tidak ditemukan", 404));
      }

      const extension = file!.mimetype.split("/")[1];
      const fullPath = path.join(
        __dirname,
        "../../public/uploads/files",
        file!.file_id
      );
      const downloadName = `${file!.filename}.${extension}`;

      if (!fs.existsSync(fullPath)) {
        res
          .status(404)
          .json(errorResponse("File tidak ditemukan di server", 404));
      }

      res.download(fullPath, downloadName);
    } catch (error) {
      next(error);
    }
  }
}
