-- DropIndex
DROP INDEX `messages_email_key` ON `messages`;

-- AlterTable
ALTER TABLE `messages` MODIFY `email` VARCHAR(255) NOT NULL;
