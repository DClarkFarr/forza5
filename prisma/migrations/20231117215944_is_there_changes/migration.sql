/*
  Warnings:

  - You are about to drop the column `stat` on the `UserCar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserCar` DROP COLUMN `stat`,
    ADD COLUMN `type` ENUM('racing', 'offroad') NOT NULL DEFAULT 'racing';
