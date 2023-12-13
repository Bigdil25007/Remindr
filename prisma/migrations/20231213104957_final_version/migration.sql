/*
  Warnings:

  - You are about to alter the column `dateCreation` on the `reminders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateFin` on the `reminders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[mail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prenom` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reminders` MODIFY `dateCreation` DATETIME NOT NULL,
    MODIFY `dateFin` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `prenom` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_mail_key` ON `Users`(`mail`);
