/*
  Warnings:

  - You are about to alter the column `speed` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.
  - You are about to alter the column `handling` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.
  - You are about to alter the column `acceleration` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.
  - You are about to alter the column `launch` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.
  - You are about to alter the column `breaking` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.
  - You are about to alter the column `offroad` on the `UserCar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.

*/
-- AlterTable
ALTER TABLE `UserCar` MODIFY `speed` DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
    MODIFY `handling` DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
    MODIFY `acceleration` DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
    MODIFY `launch` DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
    MODIFY `breaking` DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
    MODIFY `offroad` DECIMAL(4, 1) NOT NULL DEFAULT 0.0;
