'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export default async function editBarangKeluar(data: FormData) {
    const id = data.get('id') as string
    const jumlah = Number(data.get('jumlah') as string)
    const date = data.get('date') as string

    await prisma.$transaction(async (tx) => {
        const barangKeluar = await tx.barangKeluar.findUnique({ where: { id } })
        if (!barangKeluar) throw new Error('Data Barang Keluar tidak ditemukan')

        const barang = await tx.barang.update({
            where: { id: barangKeluar.barangId },
            data: {
                jumlah: {
                    increment: barangKeluar.jumlah - jumlah
                }
            }
        })

        if (barang.jumlah < 0) throw new Error('Stok barang tidak mencukupi')

        await tx.barangKeluar.update({
            where: { id },
            data: {
                jumlah,
                date: new Date(date)
            }
        })
    })

    revalidatePath('/data-barang')
    revalidatePath('/barang-keluar')
}