import { UploadedFile } from "express-fileupload";
import { FileRepository } from "../repositories/file-repository";
import path from "path";
import { ResponseError } from "../utils/response-error";
import { ListFileRequest } from "../dtos/file-dto";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { Validation } from "../utils/validation";
import { FileValidation } from "../validations/file-validation";
import { FileVersion } from "@prisma/client";
import {
  uploadFile,
  deleteCloudinaryRawFile,
  validatePdfFile,
} from "../utils/upload";
export class FileService {
  static async getAll(request: ListFileRequest): Promise<listResponse> {
    const requestList = Validation.validate(FileValidation.LIST, request);
    const filters: any[] = [];
    if (requestList.name) {
      filters.push({
        name: {
          contains: requestList.name,
        },
      });
    }

    const data = await FileRepository.findMany(
      filters,
      requestList.skip,
      requestList.take
    );

    const totalData = await FileRepository.count(filters);

    const result = {
      data,
      total_data: totalData,
      paging: {
        current_page: requestList.page,
        total_page: Math.ceil(totalData / requestList.take),
      },
    };

    return tolistResponse(result);
  }
  static async upload(file: UploadedFile, version: FileVersion) {
    if (!version || !["INDONESIA", "ENGLISH"].includes(version)) {
      throw new ResponseError(400, "Version tidak valid");
    }
    validatePdfFile(file);

    const filename = path.parse(file.name).name;
    const extension = path.extname(file.name);
    const mimetype = file.mimetype;
    const uploadResult = await uploadFile(file);
    const existingFile = await FileRepository.findByVersion(version);

    if (existingFile) {
      await deleteCloudinaryRawFile(existingFile.file_id);

      return FileRepository.updateByVersion(version, {
        filename,
        mimetype,
        file_id: uploadResult.public_id,
        file_url: uploadResult.secure_url,
      });
    }

    return FileRepository.create({
      filename,
      mimetype,
      file_id: uploadResult.public_id,
      file_url: uploadResult.secure_url,
      version,
    });
  }

  static async download(version: FileVersion) {
    if (!version) {
      throw new ResponseError(404, "Version Tidak Ada");
    }

    const response = await FileRepository.findByVersion(version);

    if (!response) {
      throw new ResponseError(404, "File Tidak Ditemukan");
    }

    return response;
  }
}
