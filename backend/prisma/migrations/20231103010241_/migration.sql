-- CreateTable
CREATE TABLE `Solution` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Solution_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
