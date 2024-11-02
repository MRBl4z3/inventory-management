/*
  Warnings:

  - Added the required column `date` to the `BarangKeluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `BarangMasuk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barangkeluar` ADD COLUMN `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `barangmasuk` ADD COLUMN `date` DATETIME(3) NOT NULL;
