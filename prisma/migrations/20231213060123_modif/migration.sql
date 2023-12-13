/*
  Warnings:

  - You are about to drop the column `date` on the `reminders` table. All the data in the column will be lost.
  - You are about to drop the column `heureEcheance` on the `reminders` table. All the data in the column will be lost.
  - Added the required column `dateCreation` to the `Reminders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFin` to the `Reminders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reminders` DROP COLUMN `date`,
    DROP COLUMN `heureEcheance`,
    ADD COLUMN `dateCreation` DATETIME NOT NULL,
    ADD COLUMN `dateFin` DATETIME NOT NULL;
