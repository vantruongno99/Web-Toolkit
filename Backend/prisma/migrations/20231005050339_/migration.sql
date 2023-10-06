/*
  Warnings:

  - Added the required column `technology` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Application` ADD COLUMN `technology` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_technology_fkey` FOREIGN KEY (`technology`) REFERENCES `Technology`(`technology`) ON DELETE RESTRICT ON UPDATE CASCADE;
