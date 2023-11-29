-- CreateTable
CREATE TABLE `Users` (
    `IDUser` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `mdp` VARCHAR(191) NOT NULL,
    `pp` VARCHAR(191) NULL,

    PRIMARY KEY (`IDUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups` (
    `IDGroup` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Groups_nom_key`(`nom`),
    PRIMARY KEY (`IDGroup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reminders` (
    `IDRappel` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME NOT NULL,
    `heureEcheance` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appartenir` (
    `IDUser` INTEGER NOT NULL,
    `IDGroup` INTEGER NOT NULL,

    UNIQUE INDEX `Appartenir_IDUser_key`(`IDUser`),
    UNIQUE INDEX `Appartenir_IDGroup_key`(`IDGroup`),
    PRIMARY KEY (`IDUser`, `IDGroup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Finir` (
    `IDUser` INTEGER NOT NULL,
    `IDRappel` INTEGER NOT NULL,
    `Check` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Finir_IDUser_key`(`IDUser`),
    UNIQUE INDEX `Finir_IDRappel_key`(`IDRappel`),
    PRIMARY KEY (`IDUser`, `IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appartenir` ADD CONSTRAINT `Appartenir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `Users`(`IDUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appartenir` ADD CONSTRAINT `Appartenir_IDGroup_fkey` FOREIGN KEY (`IDGroup`) REFERENCES `Groups`(`IDGroup`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finir` ADD CONSTRAINT `Finir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `Users`(`IDUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finir` ADD CONSTRAINT `Finir_IDRappel_fkey` FOREIGN KEY (`IDRappel`) REFERENCES `Reminders`(`IDRappel`) ON DELETE RESTRICT ON UPDATE CASCADE;
