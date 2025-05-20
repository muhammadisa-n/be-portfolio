import { Validation } from "../utils/validation";
import {
  CreateMessageRequest,
  ListMessageRequest,
  MessageResponse,
  toMessageResponse,
} from "../dtos/message-dto";
import { MessageValidation } from "../validations/message-validation";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { ResponseError } from "../utils/response-error";
import { MessageRepository } from "../repositories/message-repository";
export class MessageService {
  static async create(request: CreateMessageRequest): Promise<MessageResponse> {
    const data = Validation.validate(MessageValidation.CREATE, request);

    const response = await MessageRepository.create({
      fullName: data.fullName,
      email: data.email,
      message: data.message,
    });
    return toMessageResponse(response);
  }

  static async getAll(request: ListMessageRequest): Promise<listResponse> {
    const requestList = Validation.validate(MessageValidation.LIST, request);
    const filters: any[] = [];
    if (requestList.name) {
      filters.push({
        fullName: {
          contains: requestList.name,
        },
      });
    }

    const data = await MessageRepository.findMany(
      filters,
      requestList.skip,
      requestList.take
    );

    const totalData = await MessageRepository.count(filters);

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

  static async getOne(id: string): Promise<MessageResponse> {
    const data = await MessageRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return toMessageResponse(data);
  }

  static async softDelete(id: string) {
    const data = await MessageRepository.findNotDeleted(id);
    if (!data || data.deleted_at) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await MessageRepository.softDelete(id);
  }

  static async restoreData(id: string) {
    const data = await MessageRepository.findDeleted(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await MessageRepository.restore(id);
  }

  static async hardDelete(id: string) {
    const data = await MessageRepository.findDeleted(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await MessageRepository.hardDelete(id);
  }
}
