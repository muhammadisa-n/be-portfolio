/*
  Warnings:

  - You are about to drop the column `mimetype` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `files` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file_id` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_url` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` DROP COLUMN `mimetype`,
    DROP COLUMN `path`,
    DROP COLUMN `size`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deleted_at` TIMESTAMP(0) NULL,
    ADD COLUMN `file_id` VARCHAR(100) NOT NULL,
    ADD COLUMN `file_url` VARCHAR(100) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;

-- DropTable
DROP TABLE `images`;
