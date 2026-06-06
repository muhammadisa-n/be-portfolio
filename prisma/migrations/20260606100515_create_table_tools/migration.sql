-- CreateTable
CREATE TABLE `tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `image_id` VARCHAR(200) NOT NULL,
    `image_url` VARCHAR(300) NOT NULL,
    `tool_url` VARCHAR(100) NOT NULL,
    `type` ENUM('language', 'runtime', 'framework', 'database', 'tools') NULL,
    `sort_order` INTEGER NULL DEFAULT 0,
    `show` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
