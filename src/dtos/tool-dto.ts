import { Tool } from "@prisma/client";

export type CreateToolRequest = {
  name: string;
  description: string;
  tool_url: string;
  dad?: number;
};

export type UpdateToolRequest = {
  name?: string;
  description?: string;
  tool_url?: string;
  dad?: number;
};

export type ListToolRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};

export type ToolDetailResponse = {
  id: number;
  name: string;
  description: string;
  image_id: string;
  image_url: string;
  dad: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type ToolResponse = {
  id: number;
  name: string;
  description: string;
  image_id: string;
  image_url: string;
  dad: number;
};

export function toToolDetailResponse(tool: Tool): ToolDetailResponse {
  return {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    image_id: tool.image_id,
    image_url: tool.image_url,
    dad: tool.dad!,
    created_at: tool.created_at,
    updated_at: tool.updated_at,
    deleted_at: tool.deleted_at!,
  };
}
export function toToolResponse(tool: Tool): ToolResponse {
  return {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    image_id: tool.image_id,
    image_url: tool.image_url,
    dad: tool.dad!,
  };
}
