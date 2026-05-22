import { UploadedFile } from "express-fileupload";
import { FileRepository } from "../repositories/file-repository";
import path from "path";
import { ResponseError } from "../utils/response-error";
import { CreateFileRequest, ListFileRequest } from "../dtos/file-dto";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { Validation } from "../utils/validation";
import { FileValidation } from "../validations/file-validation";
import { FileVersion, Type } from "@prisma/client";
import {
  uploadFile,
  validatePdfFile,
  validateImageFile,
  deleteCloudinaryFile,
} from "../utils/upload";
import { TrashRepository } from "../repositories/trash-repository";
import { TrashService } from "./trash-service";
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
  static async getFileByType(type: Type) {
    const data = await FileRepository.findByType(type);
    return data?.file_url;
  }
  static async upload(file: UploadedFile, request: CreateFileRequest) {
    const createRequest = Validation.validate(FileValidation.CREATE, request);
    const filename = path.parse(file.name).name;
    const mimetype = file.mimetype;
    if (createRequest.type === Type.CV_RESUME) {
      if (!createRequest.version) {
        throw new ResponseError(400, "Version wajib diisi untuk CV");
      }

      validatePdfFile(file);

      const uploadResult = await uploadFile(file);
      const existingFile = await FileRepository.findByVersion(
        createRequest.version
      );

      if (existingFile) {
        await deleteCloudinaryFile(existingFile.file_id);

        return FileRepository.updateByVersion(createRequest.version, {
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
        version: request.version,
        type: request.type,
      });
    }
    if (createRequest.type === Type.HERO_IMAGE) {
      validateImageFile(file);
      const uploadResult = await uploadFile(file);
      const existingFile = await FileRepository.findByType(Type.HERO_IMAGE);

      if (existingFile) {
        await deleteCloudinaryFile(existingFile.file_id);
        await FileRepository.updateByType(Type.HERO_IMAGE, {
          filename,
          mimetype,
          file_id: uploadResult.public_id,
          file_url: uploadResult.secure_url,
        });

        return FileRepository.findByType(Type.HERO_IMAGE);
      }

      return FileRepository.create({
        filename,
        mimetype,
        file_id: uploadResult.public_id,
        file_url: uploadResult.secure_url,
        type: request.type,
        version: null,
      });
    }
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

  static async softDelete(id: number) {
    const data = await FileRepository.findNotDeleted(id);

    if (!data || data.deleted_at) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }

    await FileRepository.softDelete(id);

    await TrashRepository.createLog({
      entity_id: String(data.id),
      entity_type: "file",
      title: TrashService.getTrashTitle("file", data),
      subtitle: TrashService.getTrashSubtitle("file", data),
      image_url: TrashService.getTrashImage("file", data),
    });
  }
}
