-- CreateTable
CREATE TABLE `translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language` VARCHAR(100) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `value` TEXT NOT NULL,

    UNIQUE INDEX `translations_language_key_key`(`language`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
