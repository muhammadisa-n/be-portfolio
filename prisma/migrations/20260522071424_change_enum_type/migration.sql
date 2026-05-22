/*
  Warnings:

  - The values [Hero] on the enum `files_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `files` MODIFY `type` ENUM('CV_RESUME', 'HERO_IMAGE') NULL;
