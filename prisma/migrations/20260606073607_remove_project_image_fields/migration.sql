/*
  Warnings:

  - You are about to drop the column `image_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `image_id`,
    DROP COLUMN `image_url`;
