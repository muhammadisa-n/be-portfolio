-- AlterTable
ALTER TABLE `tools` ADD COLUMN `sort_order` INTEGER NULL DEFAULT 0,
    ADD COLUMN `type` ENUM('language', 'runtime', 'framework', 'database', 'tools') NULL;
