import { Tool } from "@prisma/client";

export type CreateToolRequest = {
  name: string;
  description: string;
  tool_url: string;
  type: string;
  show?: boolean;
};

export type UpdateToolRequest = {
  name?: string;
  description?: string;
  tool_url?: string;
  type?: string;
  show?: boolean;
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
  type?: string;
  sort_order?: number;
  show?: boolean;
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
  type?: string;
  sort_order?: number;
  show?: boolean;
};

export function toToolDetailResponse(tool: Tool): ToolDetailResponse {
  return {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    image_id: tool.image_id,
    image_url: tool.image_url,
    type: tool.type!,
    sort_order: tool.sort_order!,
    show: tool.show!,
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
    type: tool.type!,
    sort_order: tool.sort_order!,
    show: tool.show!,
  };
}
