-- DropForeignKey
ALTER TABLE `ApplicationVendor` DROP FOREIGN KEY `ApplicationVendor_applicationId_fkey`;

-- DropForeignKey
ALTER TABLE `ApplicationVendor` DROP FOREIGN KEY `ApplicationVendor_vendorId_fkey`;

-- AddForeignKey
ALTER TABLE `ApplicationVendor` ADD CONSTRAINT `ApplicationVendor_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationVendor` ADD CONSTRAINT `ApplicationVendor_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
