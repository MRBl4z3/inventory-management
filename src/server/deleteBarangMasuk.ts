'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function deleteBarangMasuk(data: FormData) {
    const ids = data.getAll('delete') as string[]

    for (let i = 0; i < ids.length; i++) {
        await prisma.$transaction(async () => {
            const barangMasuk = await prisma.barangMasuk.delete({
                where: { id: ids[i] }
            })

            const barang = await prisma.barang.findUnique({
                where: { id: barangMasuk.barangId }
            })

            if (!barang) throw new Error('Barang tidak ditemukan')

            await prisma.barang.update({
                where: { id: barangMasuk.barangId },
                data: { jumlah: barang.jumlah - barangMasuk.jumlah }
            })
        })
    }

    revalidateTag('barang-masuk')
}