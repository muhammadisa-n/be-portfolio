import { Message } from "@prisma/client";

export type CreateMessageRequest = {
  fullName: string;
  email: string;
  message: string;
};

export type ListMessageRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};

export type MessageDetailResponse = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type MessageResponse = {
  id: string;
  fullName: string;
  email: string;
  message: string;
};

export function toMessageDetailResponse(
  message: Message
): MessageDetailResponse {
  return {
    id: message.id,
    fullName: message.fullName,
    email: message.email,
    message: message.message,
    created_at: message.created_at,
    updated_at: message.updated_at,
    deleted_at: message.deleted_at!,
  };
}
export function toMessageResponse(message: Message): MessageResponse {
  return {
    id: message.id,
    fullName: message.fullName,
    email: message.email,
    message: message.message,
  };
}
