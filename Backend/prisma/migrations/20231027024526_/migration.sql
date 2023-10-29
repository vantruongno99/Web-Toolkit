/*
  Warnings:

  - You are about to alter the column `approved` on the `ApplicationVendor` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `ApplicationVendor` MODIFY `approved` VARCHAR(191) NOT NULL DEFAULT 'PENDING';
