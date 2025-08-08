import { Validation } from "../utils/validation";
import {
  CreateProjectRequest,
  ListProjectRequest,
  UpdateProjectRequest,
  ProjectResponse,
  toProjectResponse,
} from "../dtos/project-dto";
import { ProjectValidation } from "../validations/project-validation";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { ResponseError } from "../utils/response-error";
import { uploadImageProjects } from "../utils/upload";
import { UploadedFile } from "express-fileupload";
import { cloudinary } from "../config/cloudinary";
import { ProjectRepository } from "../repositories/project-repository";
export class ProjectService {
  static async create(
    request: CreateProjectRequest,
    file: UploadedFile
  ): Promise<ProjectResponse> {
    const data = Validation.validate(ProjectValidation.CREATE, request);
    const imageUpload = await uploadImageProjects(file);
    const response = await ProjectRepository.create(
      {
        name: data.name,
        description: data.description,
        demo_url: data.demo_url,
        project_url: data.project_url,
        dad: data.dad,
        image_id: imageUpload.public_id,
        image_url: imageUpload.secure_url,
      },
      data.tool_ids
    );
    return toProjectResponse(response);
  }

  static async getAll(request: ListProjectRequest): Promise<listResponse> {
    const requestList = Validation.validate(ProjectValidation.LIST, request);
    const filters: any[] = [];
    if (requestList.name) {
      filters.push({
        name: {
          contains: requestList.name,
        },
      });
    }

    const data = await ProjectRepository.findMany(
      filters,
      requestList.skip,
      requestList.take
    );

    const totalData = await ProjectRepository.count(filters);

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

  static async getOne(id: number): Promise<ProjectResponse> {
    const data = await ProjectRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return toProjectResponse(data);
  }

  static async update(
    request: UpdateProjectRequest,
    id: number,
    file?: UploadedFile
  ): Promise<ProjectResponse> {
    const data = Validation.validate(ProjectValidation.UPDATE, request);
    const existingProject = await ProjectRepository.findById(id);

    if (!existingProject) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }

    let image_id = existingProject.image_id;
    let image_url = existingProject.image_url;

    if (file) {
      if (image_id) {
        await cloudinary.uploader.destroy(image_id);
      }
      const imageUpload = await uploadImageProjects(file);
      image_id = imageUpload.public_id;
      image_url = imageUpload.secure_url;
    }

    const updated = await ProjectRepository.update(
      id,
      {
        name: data.name ?? existingProject.name,
        description: data.description ?? existingProject.description,
        demo_url: data.demo_url ?? existingProject.demo_url,
        project_url: data.project_url ?? existingProject.project_url,
        dad: data.dad ?? existingProject.dad,
        image_id,
        image_url,
      },
      data.tool_ids
    );

    return toProjectResponse(updated);
  }

  static async softDelete(id: number) {
    const data = await ProjectRepository.findNotDeleted(id);
    if (!data || data.deleted_at) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await ProjectRepository.softDelete(id);
  }

  static async restoreData(id: number) {
    const data = await ProjectRepository.findDeleted(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await ProjectRepository.restore(id);
  }

  static async hardDelete(id: number) {
    const data = await ProjectRepository.findDeleted(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await ProjectRepository.hardDelete(id);
  }

  static async count() {
    const data = await ProjectRepository.countAll();
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return data;
  }
}
