-- CreateTable
CREATE TABLE `Purpose` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Purpose_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participation` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Participation_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Engagement` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Engagement_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scale` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Scale_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Budget` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Budget_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
