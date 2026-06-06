import { Validation } from "../utils/validation";
import {
  CreateProjectRequest,
  ListProjectRequest,
  UpdateProjectRequest,
  ProjectResponse,
  toProjectResponse,
  toProjectDetailResponse,
  projectDetailResponse,
} from "../dtos/project-dto";
import { ProjectValidation } from "../validations/project-validation";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { ResponseError } from "../utils/response-error";
import { uploadImageProjects } from "../utils/upload";
import { UploadedFile } from "express-fileupload";
import { cloudinary } from "../config/cloudinary";
import { ProjectRepository } from "../repositories/project-repository";
import { TrashService } from "./trash-service";
import { TrashRepository } from "../repositories/trash-repository";
export class ProjectService {
  static async create(
    request: CreateProjectRequest,
    files: UploadedFile[]
  ): Promise<ProjectResponse> {
    const data = Validation.validate(ProjectValidation.CREATE, request);
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImageProjects(file))
    );

    const response = await ProjectRepository.createWithTranslation({
      name_en: data.name_en,
      name_id: data.name_id,
      description_en: data.description_en,
      description_id: data.description_id,
      demo_url: data.demo_url,
      project_url: data.project_url,
      tool_ids: data.tool_ids,
      images: uploadedImages.map((image, index) => ({
        image_id: image.public_id,
        image_url: image.secure_url,
        sort_order: index,
      })),
    });
    if (!response) {
      throw new ResponseError(500, "Gagal Membuat Project");
    }
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

  static async getOne(id: number): Promise<projectDetailResponse> {
    const data = await ProjectRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return toProjectDetailResponse(data);
  }

  static async update(
    request: UpdateProjectRequest,
    id: number,
    files?: UploadedFile[]
  ): Promise<ProjectResponse> {
    const data = Validation.validate(ProjectValidation.UPDATE, request);
    const existingProject = await ProjectRepository.findById(id);

    if (!existingProject) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }

    let images:
      | {
          image_id: string;
          image_url: string;
          sort_order: number;
        }[]
      | undefined = undefined;

    if (files && files.length > 0) {
      for (const image of existingProject.images || []) {
        await cloudinary.uploader.destroy(image.image_id);
      }

      const uploadedImages = await Promise.all(
        files.map((file) => uploadImageProjects(file))
      );

      const mainImage = uploadedImages[0];

      images = uploadedImages.map((image, index) => ({
        image_id: image.public_id,
        image_url: image.secure_url,
        sort_order: index,
      }));
    }

    const updated = await ProjectRepository.updateWithTransaction(id, {
      name_en: data.name_en,
      name_id: data.name_id,
      description_en: data.description_en,
      description_id: data.description_id,
      demo_url: data.demo_url,
      project_url: data.project_url,
      tool_ids: data.tool_ids,
      images: images,
    });

    if (!updated) {
      throw new ResponseError(500, "Gagal Update Project");
    }
    return toProjectResponse(updated);
  }

  static async softDelete(id: number) {
    const data = await ProjectRepository.findNotDeleted(id);
    if (!data || data.deleted_at) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await ProjectRepository.softDelete(id);
    await TrashRepository.createLog({
      entity_id: String(data.id),
      entity_type: "project",
      title: TrashService.getTrashTitle("project", data),
      subtitle: TrashService.getTrashSubtitle("project", data),
      image_url: TrashService.getTrashImage("project", data),
    });
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
