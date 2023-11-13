-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Car_make_model_key`(`make`, `model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
