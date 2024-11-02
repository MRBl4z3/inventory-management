-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'SuperAdmin', 'Petugas') NOT NULL;
