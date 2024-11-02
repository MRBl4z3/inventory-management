-- CreateTable
CREATE TABLE `Barang` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `jenisId` VARCHAR(191) NOT NULL,
    `satuanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_jenisId_fkey` FOREIGN KEY (`jenisId`) REFERENCES `JenisBarang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
