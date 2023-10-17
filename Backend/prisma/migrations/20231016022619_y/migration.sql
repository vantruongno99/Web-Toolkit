-- CreateTable
CREATE TABLE `Technology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `technology` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Technology_technology_key`(`technology`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `potentialApplications` VARCHAR(191) NOT NULL,
    `explanation` TEXT NOT NULL,
    `maturity` VARCHAR(191) NOT NULL,
    `stageOfParticipation` VARCHAR(191) NOT NULL,
    `purposeOfEngagement` VARCHAR(191) NOT NULL,
    `levelOfEngagement` VARCHAR(191) NOT NULL,
    `scale` VARCHAR(191) NOT NULL,
    `budget` VARCHAR(191) NOT NULL,
    `solutionFor` VARCHAR(191) NOT NULL,
    `considerations` VARCHAR(191) NOT NULL,
    `technologyId` INTEGER NOT NULL,

    UNIQUE INDEX `Application_potentialApplications_key`(`potentialApplications`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ABN` INTEGER NOT NULL,

    UNIQUE INDEX `Vendor_name_key`(`name`),
    UNIQUE INDEX `Vendor_ABN_key`(`ABN`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplicationVendor` (
    `vendorId` INTEGER NOT NULL,
    `applicationId` INTEGER NOT NULL,

    PRIMARY KEY (`vendorId`, `applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationVendor` ADD CONSTRAINT `ApplicationVendor_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationVendor` ADD CONSTRAINT `ApplicationVendor_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
