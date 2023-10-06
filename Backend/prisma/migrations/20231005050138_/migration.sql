-- CreateTable
CREATE TABLE `Technology` (
    `technology` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Technology_technology_key`(`technology`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `potentialApplications` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,
    `maturity` VARCHAR(191) NOT NULL,
    `stageOfParticipation` VARCHAR(191) NOT NULL,
    `purposeOfEngagement` VARCHAR(191) NOT NULL,
    `levelOfEngagement` VARCHAR(191) NOT NULL,
    `scale` VARCHAR(191) NOT NULL,
    `budget` VARCHAR(191) NOT NULL,
    `solutionFor` VARCHAR(191) NOT NULL,
    `considerations` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Application_potentialApplications_key`(`potentialApplications`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
