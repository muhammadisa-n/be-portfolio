import { User } from "@prisma/client";
export type loginRequest = {
  email: string;
  password: string;
  remember_me?: boolean;
};
export type loginGoogleRequest = {
  code: string;
  remember_me?: boolean;
};
export type CreateUserRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  fullName?: string;
  email?: string;
  password?: string;
  image_id?: string;
  image_url?: string;
};

export type ListUserRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};
export type UserDetailResponse = {
  id: string;
  fullName: string;
  email: string;
  image_id?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export type UserResponse = {
  id: string;
  fullName: string;
  email: string;
  image_id?: string;
  image_url?: string;
};

export function toUserDetailResponse(user: User): UserDetailResponse {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    image_id: user.image_id!,
    image_url: user.image_url!,
    created_at: user.created_at,
    updated_at: user.updated_at,
    deleted_at: user.deleted_at!,
  };
}
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    image_id: user.image_id!,
    image_url: user.image_url!,
  };
}
