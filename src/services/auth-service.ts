import {
  toUserDetailResponse,
  toUserResponse,
  UserDetailResponse,
  UserResponse,
  loginRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from "../dtos/user-dto";
import { ResponseError } from "../utils/response-error";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../utils/validation";
import * as argon2 from "argon2";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserRepository } from "../repositories/user-repository";
import { UserRequest } from "../types/type-request";
import { prismaClient } from "../config/database";
import { env } from "../config/env";
import { UploadedFile } from "express-fileupload";
import { deleteCloudinaryFile, uploadFile } from "../utils/upload";

export class AuthService {
  static async login(request: loginRequest) {
    const data = Validation.validate(UserValidation.LOGIN, request);
    const userExits = await UserRepository.findUserByEmail(data.email);

    if (!userExits) {
      throw new ResponseError(401, "Gagal Login! Detail login salah");
    }

    const isPasswordValid = await argon2.verify(
      userExits.password,
      data.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Gagal Login! Detail login salah");
    }

    const refreshToken = jwt.sign(
      {
        user_id: userExits.id,
        user_fullName: userExits.fullName,
        user_email: userExits.email,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    const accessTokenExpiresIn = env.NODE_ENV === "production" ? "15s" : "5m";
    const accessToken = jwt.sign(
      {
        user_id: userExits.id,
        user_fullName: userExits.fullName,
        user_email: userExits.email,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: accessTokenExpiresIn,
      }
    );

    const user = toUserResponse(userExits);
    return { user, refreshToken, accessToken };
  }

  static async me(user: User): Promise<UserDetailResponse> {
    return toUserDetailResponse(user);
  }

  static async updateProfile(
    user: User,
    request: UpdateUserRequest,
    file?: UploadedFile
  ): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.UPDATE, request);
    if (data.fullName) {
      user.fullName = data.fullName;
    }
    if (data.password) {
      user.password = await argon2.hash(data.password);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await UserRepository.findemailExistsNotUserLoggedIn(
        data.email,
        user.id
      );
      if (emailExists != 0) {
        throw new ResponseError(409, "Email Sudah Ada");
      }
      user.email = data.email;
    }
    let image_id = user.image_id;
    let image_url = user.image_url;
    if (file) {
      const uploadResult = await uploadFile(file);

      if (user.image_id) {
        await deleteCloudinaryFile(user.image_id);
      }

      image_id = uploadResult.public_id;
      image_url = uploadResult.secure_url;
    }

    const result = await UserRepository.updateUser(
      {
        fullName: user.fullName,
        password: user.password,
        email: user.email,
        image_id,
        image_url,
      },
      user.id
    );
    return toUserResponse(result);
  }

  static async logout(req: UserRequest) {
    const refreshToken = req.cookies.refresh_token;
    if (!req.user) {
      throw new ResponseError(401, "Unauthorized: Anda Belum Login.");
    }
    if (!refreshToken) {
      throw new ResponseError(401, "Unauthorized: Anda Belum Login.");
    }
    return refreshToken;
  }

  static async refreshToken(req: Request) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new ResponseError(401, "Unauthorized, Anda Belum Login");
    }

    try {
      const decoded = jwt.verify(refreshToken, env.JWT_SECRET as string) as any;

      const user = await prismaClient.user.findUnique({
        where: { id: decoded.user_id },
      });

      if (!user) {
        throw new ResponseError(401, "Unauthorized, Anda Belum Login.");
      }
      const payload = {
        user_id: user.id,
        user_fullName: user.fullName,
        user_email: user.email,
      };
      const accessTokenExpiresIn = env.NODE_ENV === "production" ? "15s" : "5m";
      const accessToken = jwt.sign(payload, env.JWT_SECRET as string, {
        expiresIn: accessTokenExpiresIn,
      });
      return { accessToken, user: payload };
    } catch (err) {
      throw new ResponseError(401, "Token Tidak Valid Atau Kadaluarsa");
    }
  }
}
