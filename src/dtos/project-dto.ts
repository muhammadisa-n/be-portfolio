import { Prisma } from "@prisma/client";

export type CreateProjectRequest = {
  name_en: string;
  name_id?: string;
  description_en: string;
  description_id?: string;
  demo_url?: string;
  project_url: string;
  tool_ids: number[];
};

export type UpdateProjectRequest = {
  name_en: string;
  name_id?: string;
  description_en: string;
  description_id?: string;
  demo_url?: string;
  project_url?: string;
  tool_ids?: number[];
};

export type ListProjectRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};

export type ProjectImageResponse = {
  id: number;
  project_id: number;
  image_id: string;
  image_url: string;
  sort_order: number | null;
};

export type projectDetailResponse = {
  id: number;
  name: string;
  description: string;
  demo_url?: string;
  project_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  project_has_tool: {
    project_id: number;
    tool_id: number;
    tool: {
      name: string;
      tool_url: string;
      type: string | null;
      sort_order: number | null;
    };
  }[];
  images?: ProjectImageResponse[];
};
export type ProjectResponse = {
  id: number;
  name: string;
  description: string;
  demo_url?: string;
  project_url: string;
  images?: ProjectImageResponse[];
};

type ProjectWithTools = Prisma.ProjectGetPayload<{
  include: {
    images: true;
    project_has_tool: {
      include: {
        tool: {
          select: {
            name: true;
            tool_url: true;
            type: true;
            sort_order: true;
          };
        };
      };
    };
  };
}>;
export function toProjectDetailResponse(
  project: ProjectWithTools
): projectDetailResponse {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    demo_url: project.demo_url!,
    project_url: project.project_url,
    created_at: project.created_at,
    updated_at: project.updated_at,
    deleted_at: project.deleted_at!,
    project_has_tool: project.project_has_tool || [],
    images: project.images || [],
  };
}
type ProjectWithImages = Prisma.ProjectGetPayload<{
  include: {
    images: true;
  };
}>;
export function toProjectResponse(project: ProjectWithImages): ProjectResponse {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    demo_url: project.demo_url!,
    project_url: project.project_url,
    images: project.images || [],
  };
}
