'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function deleteBarangKeluar(data: FormData) {
    const ids = data.getAll('delete') as string[]

    for (let i = 0; i < ids.length; i++) {
        await prisma.$transaction(async () => {
            const barangKeluar = await prisma.barangKeluar.findUnique({
                where: { id: ids[i] }
            })

            if (!barangKeluar) throw new Error('Barang keluar tidak ditemukan')

            const barang = await prisma.barang.findUnique({
                where: { id: barangKeluar.barangId }
            })

            if (!barang) throw new Error('Barang tidak ditemukan')

            await prisma.barang.update({
                where: { id: barang.id },
                data: { jumlah: barang.jumlah + barangKeluar.jumlah }
            })

            await prisma.barangKeluar.delete({
                where: { id: ids[i] }
            })
        })
    }

    revalidateTag('barang-keluar')
}