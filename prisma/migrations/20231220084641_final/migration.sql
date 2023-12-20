-- CreateTable
CREATE TABLE `users` (
    `IDUser` INTEGER NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `mdp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_mail_key`(`mail`),
    PRIMARY KEY (`IDUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `IDGroup` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `groups_nom_key`(`nom`),
    PRIMARY KEY (`IDGroup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reminders` (
    `IDRappel` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateFin` DATETIME(0) NOT NULL,
    `IDGroup` INTEGER NOT NULL,
    `couleur` ENUM('red', 'green', 'blue', 'aqua', 'orange', 'brown', 'grey', 'violet') NOT NULL,

    PRIMARY KEY (`IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appartenir` (
    `IDUser` INTEGER NOT NULL,
    `IDGroup` INTEGER NOT NULL,

    PRIMARY KEY (`IDUser`, `IDGroup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finir` (
    `IDUser` INTEGER NOT NULL,
    `IDRappel` INTEGER NOT NULL,
    `Check` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`IDUser`, `IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reminders` ADD CONSTRAINT `reminders_IDGroup_fkey` FOREIGN KEY (`IDGroup`) REFERENCES `groups`(`IDGroup`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `users`(`IDUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_IDGroup_fkey` FOREIGN KEY (`IDGroup`) REFERENCES `groups`(`IDGroup`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finir` ADD CONSTRAINT `finir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `users`(`IDUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finir` ADD CONSTRAINT `finir_IDRappel_fkey` FOREIGN KEY (`IDRappel`) REFERENCES `reminders`(`IDRappel`) ON DELETE RESTRICT ON UPDATE CASCADE;
