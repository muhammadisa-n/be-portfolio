import { File, Type, FileVersion } from "@prisma/client";

export type CreateFileRequest = {
  type: Type;
  version?: FileVersion;
};
export type ListFileRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};

export type FileResponse = {
  id: number;
  filename: string;
  file_id: string;
  file_url: string;
  mimetype: string;
  version?: string;
  type?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export function toFileResponse(file: File): FileResponse {
  return {
    id: file.id,
    filename: file.filename,
    file_id: file.file_id,
    file_url: file.file_url,
    mimetype: file.mimetype,
    version: file.version!,
    type: file.type!,
    created_at: file.created_at,
    updated_at: file.updated_at,
    deleted_at: file.deleted_at!,
  };
}
