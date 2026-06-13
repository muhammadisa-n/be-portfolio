import { NextFunction, Request, Response } from "express";
import {
  loginGoogleRequest,
  loginRequest,
  UpdateUserRequest,
} from "../dtos/user-dto";
import { successResponse, successUpdateResponse } from "../utils/response";
import { AuthService } from "../services/auth-service";
import { UserRequest } from "../types/type-request";
import { env } from "../config/env";
import { validateImageFile } from "../utils/upload";
import { UploadedFile } from "express-fileupload";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: loginRequest = req.body as loginRequest;
      const response = await AuthService.login(request);
      const cookieName =
        env.NODE_ENV === "production" ? "__Host-pf_rt" : "pf_rt";
      res.cookie(cookieName, response.refreshToken, {
        httpOnly: true,
        maxAge: response.refreshTokenMaxAge,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      res.status(200).json(
        successResponse("Login Berhasil", 200, {
          user: response.user,
          accessToken: response.accessToken,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async loginWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: loginGoogleRequest = req.body as loginGoogleRequest;
      const response = await AuthService.loginWithGoogle(request);

      const cookieName =
        env.NODE_ENV === "production" ? "__Host-pf_rt" : "pf_rt";

      res.cookie(cookieName, response.refreshToken, {
        httpOnly: true,
        maxAge: response.refreshTokenMaxAge,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.status(200).json(
        successResponse("Login Google Berhasil", 200, {
          user: response.user,
          accessToken: response.accessToken,
        })
      );
    } catch (error) {
      next(error);
    }
  }
  static async me(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.me(req.user!);
      res
        .status(200)
        .json(successResponse("Get Detail User Berhasil", 200, response));
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const file = req.files?.image;
      const image = file ? (Array.isArray(file) ? file[0] : file) : undefined;
      if (image) {
        validateImageFile(image);
      }
      const response = await AuthService.updateProfile(
        req.user!,
        request,
        image as UploadedFile | undefined
      );
      res.status(200).json(successUpdateResponse(response));
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    await AuthService.logout(req);
    const cookieName = env.NODE_ENV === "production" ? "__Host-pf_rt" : "pf_rt";
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json(successResponse("Logout berhasil", 200));
  }
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.refreshToken(req);
      res.status(200).json(
        successResponse("Get Access Token Berhasil", 200, {
          user: response.user,
          accessToken: response.accessToken,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
