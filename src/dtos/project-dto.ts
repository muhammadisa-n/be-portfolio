import { Project } from "@prisma/client";

export type CreateProjectRequest = {
  name: string;
  description: string;
  demo_url: string;
  project_url: string;
  dad?: number;
  tool_ids: number[];
};

export type UpdateProjectRequest = {
  name?: string;
  description?: string;
  demo_url?: string;
  project_url?: string;
  dad?: number;
  tool_ids?: number[];
};

export type ListProjectRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};

export type projectDetailResponse = {
  id: number;
  name: string;
  description: string;
  image_id: string;
  image_url: string;
  demo_url: string;
  project_url: string;
  dad: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type ProjectResponse = {
  id: number;
  name: string;
  description: string;
  image_id: string;
  image_url: string;
  demo_url: string;
  project_url: string;
  dad: number;
};

export function toProjectDetailResponse(
  project: Project
): projectDetailResponse {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    image_id: project.image_id,
    image_url: project.image_url,
    demo_url: project.demo_url,
    project_url: project.project_url,
    dad: project.dad!,
    created_at: project.created_at,
    updated_at: project.updated_at,
    deleted_at: project.deleted_at!,
  };
}
export function toProjectResponse(project: Project): ProjectResponse {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    image_id: project.image_id,
    image_url: project.image_url,
    demo_url: project.demo_url,
    project_url: project.project_url,
    dad: project.dad!,
  };
}
