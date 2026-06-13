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
import { ProjectImageRepository } from "../repositories/project-image-repository";
import { SortProjectImageRequest } from "../dtos/project-image-dto";
import { TranslationRepository } from "../repositories/translation-repository";
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
      project_url: data.project_url,
      demo_url: data.demo_url!,
      show: data.show!,
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
      const translations = await TranslationRepository.findProjectKeysByValue(
        requestList.name,
        requestList.language
      );

      const translationKeys = translations.map((item) => item.key);

      filters.push({
        OR: [
          {
            name: {
              contains: requestList.name,
            },
          },
          {
            name: {
              in: translationKeys,
            },
          },
        ],
      });
    }
    if (requestList.show !== undefined) {
      filters.push({
        show: requestList.show,
      });
    }

    const sortBy = requestList.sortBy || "created_at";
    const sortOrder = requestList.sortOrder || "desc";
    const language = requestList.language || "en";

    const totalData = await ProjectRepository.count(filters);

    let data;

    if (sortBy === "name") {
      const allProjects = await ProjectRepository.findAll(filters);

      const translations =
        await TranslationRepository.findProjectNameTranslations(language);

      const translationMap = new Map(
        translations.map((item) => [item.key, item.value])
      );

      data = allProjects
        .sort((a, b) => {
          const nameA = translationMap.get(a.name) || a.name;
          const nameB = translationMap.get(b.name) || b.name;

          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        })
        .slice(requestList.skip, requestList.skip + requestList.take);
    } else {
      data = await ProjectRepository.findMany(
        filters,
        requestList.skip,
        requestList.take,
        sortBy,
        sortOrder
      );
    }

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
      project_url: data.project_url,
      demo_url: data.demo_url,
      show: data.show,
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

  static async count() {
    const data = await ProjectRepository.countAll();
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return data;
  }

  static async deleteProjectImage(projectId: number, imageId: number) {
    const image = await ProjectImageRepository.findImageById(
      projectId,
      imageId
    );

    if (!image) {
      throw new ResponseError(404, "Image tidak ditemukan");
    }

    const count = await ProjectImageRepository.countProjectImages(projectId);

    if (count <= 1) {
      throw new ResponseError(400, "Project minimal harus memiliki 1 image");
    }

    await cloudinary.uploader.destroy(image.image_id);

    await ProjectImageRepository.deleteImageById(projectId, imageId);

    const remainingImages =
      await ProjectImageRepository.findImagesByProjectId(projectId);

    await ProjectImageRepository.updateImageSort(
      projectId,
      remainingImages.map((image, index) => ({
        id: image.id,
        sort_order: index,
      }))
    );
  }

  static async sortProjectImages(
    projectId: number,
    request: SortProjectImageRequest
  ) {
    if (!request.images || request.images.length === 0) {
      throw new ResponseError(400, "Images tidak boleh kosong");
    }

    await ProjectImageRepository.updateImageSort(projectId, request.images);
  }
  static async addProjectImages(projectId: number, files: UploadedFile[]) {
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new ResponseError(404, "Project tidak ditemukan");
    }
    const existingCount =
      await ProjectImageRepository.countProjectImages(projectId);

    const uploadedImages = await Promise.all(
      files.map((file) => uploadImageProjects(file))
    );

    await ProjectImageRepository.addImages(
      projectId,
      uploadedImages.map((image, index) => ({
        image_id: image.public_id,
        image_url: image.secure_url,
        sort_order: existingCount + index,
      }))
    );
  }
}
