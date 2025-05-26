/*
  Warnings:

  - Added the required column `mimetype` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` ADD COLUMN `mimetype` VARCHAR(300) NOT NULL;
