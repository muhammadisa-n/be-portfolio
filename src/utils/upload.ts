import { cloudinary } from "../config/cloudinary";
import { UploadedFile } from "express-fileupload";
import { ResponseError } from "./response-error";

export const uploadImageTools = async (file: UploadedFile) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "portfolio/tools-images",
    tags: `tool-image`,
  });

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};

export const uploadImageProjects = async (file: UploadedFile) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "portfolio/projects-images",
    tags: `project-image`,
  });

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};
export const uploadFile = async (file: UploadedFile) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "portfolio/uploads",
    tags: `portfolio-upload`,
  });

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};
export const validateImageFile = (file: UploadedFile) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.mimetype)) {
    throw new ResponseError(400, "Format Image Tidak Valid");
  }

  if (file.size > maxSize) {
    throw new ResponseError(400, "Ukuran Image Maksimal 5MB.");
  }
};
