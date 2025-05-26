import { uploadFile } from "../utils/upload";
import { UploadedFile } from "express-fileupload";
import { FileRepository } from "../repositories/file-repository";
import fs from "fs";
import path from "path";
import { ResponseError } from "../utils/response-error";
export class FileService {
  static async upload(file: UploadedFile) {
    const filename = path.parse(file.name).name;
    const extension = path.extname(file.name);
    const mimetype = file.mimetype;
    const newFilename = `${filename}-${Date.now()}${extension}`;
    const uploadPath = path.join("public", "uploads", "files", newFilename);
    await file.mv(uploadPath);
    const response = await FileRepository.create({
      filename: filename,
      mimetype: mimetype,
      file_id: newFilename,
      file_url: `/uploads/files/${newFilename}`,
    });
    return response;
  }

  static async download(filename: string) {
    if (!filename) {
      throw new ResponseError(404, "FIlename Tidak Ada");
    }

    const response = await FileRepository.findByFilename(filename);
    return response;
  }
}
