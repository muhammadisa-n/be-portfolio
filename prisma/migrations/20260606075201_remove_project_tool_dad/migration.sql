/*
  Warnings:

  - You are about to drop the column `dad` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `dad` on the `tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `dad`;

-- AlterTable
ALTER TABLE `tools` DROP COLUMN `dad`;
