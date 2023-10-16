/*
  Warnings:

  - You are about to drop the column `technology` on the `Application` table. All the data in the column will be lost.
  - Added the required column `id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technologyId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Application` DROP FOREIGN KEY `Application_technology_fkey`;

-- AlterTable
ALTER TABLE `Application` DROP COLUMN `technology`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `technologyId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Technology` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
