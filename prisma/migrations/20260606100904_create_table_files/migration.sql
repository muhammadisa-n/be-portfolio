-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(100) NOT NULL,
    `file_id` VARCHAR(100) NOT NULL,
    `file_url` VARCHAR(300) NOT NULL,
    `mimetype` VARCHAR(300) NOT NULL,
    `version` ENUM('INDONESIA', 'ENGLISH') NULL,
    `type` ENUM('CV_RESUME', 'HERO_IMAGE') NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `files_version_key`(`version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
