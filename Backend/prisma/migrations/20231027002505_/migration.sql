-- DropForeignKey
ALTER TABLE `Application` DROP FOREIGN KEY `Application_technologyId_fkey`;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
