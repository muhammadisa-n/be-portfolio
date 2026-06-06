import { Validation } from "../utils/validation";
import {
  CreateToolRequest,
  ListToolRequest,
  UpdateToolRequest,
  ToolResponse,
  toToolResponse,
} from "../dtos/tool-dto";
import { ToolValidation } from "../validations/tool-validation";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { ResponseError } from "../utils/response-error";
import { uploadImageTools } from "../utils/upload";
import { UploadedFile } from "express-fileupload";
import { cloudinary } from "../config/cloudinary";
import { ToolRepository } from "../repositories/tool-repository";
import { TrashService } from "./trash-service";
import { TrashRepository } from "../repositories/trash-repository";
const getSortOrderByType = (type: string) => {
  const sortOrderMap: Record<string, number> = {
    language: 1,
    runtime: 2,
    framework: 3,
    database: 4,
    tools: 5,
  };

  return sortOrderMap[type];
};
export class ToolService {
  static async create(
    request: CreateToolRequest,
    file: UploadedFile
  ): Promise<ToolResponse> {
    const data = Validation.validate(ToolValidation.CREATE, request);
    const imageUpload = await uploadImageTools(file);

    const response = await ToolRepository.create({
      name: data.name,
      description: data.description,
      tool_url: data.tool_url,
      image_id: imageUpload.public_id,
      image_url: imageUpload.secure_url,
      type: data.type,
      sort_order: getSortOrderByType(data.type),
      show: data.show ? data.show : true,
    });
    return toToolResponse(response);
  }

  static async getAll(request: ListToolRequest): Promise<listResponse> {
    const requestList = Validation.validate(ToolValidation.LIST, request);
    const filters: any[] = [];
    if (requestList.name) {
      filters.push({
        name: {
          contains: requestList.name,
        },
      });
    }

    const data = await ToolRepository.findMany(
      filters,
      requestList.skip,
      requestList.take
    );

    const totalData = await ToolRepository.count(filters);

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

  static async getAllPublic(request: ListToolRequest): Promise<listResponse> {
    const requestList = Validation.validate(ToolValidation.LIST, request);
    const filters: any[] = [];
    if (requestList.name) {
      filters.push({
        name: {
          contains: requestList.name,
        },
      });
    }

    const data = await ToolRepository.findManyPublic(
      filters,
      requestList.skip,
      requestList.take
    );

    const totalData = await ToolRepository.countPublic(filters);

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

  static async getOne(id: number): Promise<ToolResponse> {
    const data = await ToolRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return toToolResponse(data);
  }

  static async update(
    request: UpdateToolRequest,
    id: number,
    file?: UploadedFile
  ): Promise<ToolResponse> {
    const data = Validation.validate(ToolValidation.UPDATE, request);
    const tool = await ToolRepository.findById(id);
    if (!tool) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    let image_id = tool.image_id;
    let image_url = tool.image_url;

    if (file) {
      if (tool.image_id) {
        await cloudinary.uploader.destroy(tool.image_id);
      }

      const imageUpload = await uploadImageTools(file);
      image_id = imageUpload.public_id;
      image_url = imageUpload.secure_url;
    }
    const updated = await ToolRepository.update(id, {
      name: data.name ?? tool.name,
      description: data.description ?? tool.description,
      tool_url: data.tool_url ?? tool.tool_url,
      type: data.type ?? tool.type,
      show: data.show ?? tool.show,
      sort_order: getSortOrderByType(data.type!) ?? tool.sort_order,
      image_id,
      image_url,
    });

    return toToolResponse(updated);
  }

  static async softDelete(id: number) {
    const data = await ToolRepository.findNotDeleted(id);

    if (!data || data.deleted_at) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }

    await ToolRepository.softDelete(id);

    await TrashRepository.createLog({
      entity_id: String(data.id),
      entity_type: "tool",
      title: TrashService.getTrashTitle("tool", data),
      subtitle: TrashService.getTrashSubtitle("tool", data),
      image_url: TrashService.getTrashImage("tool", data),
    });
  }

  static async count() {
    const data = await ToolRepository.countAll();
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return data;
  }
  static async mostUsed(take: number) {
    const data = await ToolRepository.findMostUsed(take);

    return data;
  }
}
