-- CreateTable
CREATE TABLE `trash_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(100) NOT NULL,
    `entity_type` ENUM('user', 'tool', 'project', 'message', 'file') NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `subtitle` VARCHAR(255) NULL,
    `image_url` VARCHAR(300) NULL,
    `deleted_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `trash_logs_entity_id_entity_type_key`(`entity_id`, `entity_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
