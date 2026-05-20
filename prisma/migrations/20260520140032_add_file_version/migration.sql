/*
  Warnings:

  - A unique constraint covering the columns `[version]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `files` ADD COLUMN `version` ENUM('INDONESIA', 'ENGLISH') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `files_version_key` ON `files`(`version`);
