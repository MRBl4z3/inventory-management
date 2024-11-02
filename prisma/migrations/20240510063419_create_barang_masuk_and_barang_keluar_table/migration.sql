-- CreateTable
CREATE TABLE `BarangMasuk` (
    `id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `barangId` VARCHAR(191) NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BarangKeluar` (
    `id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `barangId` VARCHAR(191) NOT NULL,
    `pembeliId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BarangMasuk` ADD CONSTRAINT `BarangMasuk_barangId_fkey` FOREIGN KEY (`barangId`) REFERENCES `Barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangMasuk` ADD CONSTRAINT `BarangMasuk_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangKeluar` ADD CONSTRAINT `BarangKeluar_barangId_fkey` FOREIGN KEY (`barangId`) REFERENCES `Barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangKeluar` ADD CONSTRAINT `BarangKeluar_pembeliId_fkey` FOREIGN KEY (`pembeliId`) REFERENCES `Pembeli`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
