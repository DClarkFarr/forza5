-- CreateTable
CREATE TABLE `UserCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `stat` ENUM('racing', 'offroad') NOT NULL DEFAULT 'racing',
    `speed` DECIMAL(4, 2) NOT NULL,
    `handling` DECIMAL(4, 2) NOT NULL,
    `acceleration` DECIMAL(4, 2) NOT NULL,
    `launch` DECIMAL(4, 2) NOT NULL,
    `breaking` DECIMAL(4, 2) NOT NULL,
    `offroad` DECIMAL(4, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCar` ADD CONSTRAINT `UserCar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCar` ADD CONSTRAINT `UserCar_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
