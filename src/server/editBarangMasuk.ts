'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function editBarangMasuk(data: FormData) {
    const id = data.get('id') as string
    const jumlah = Number(data.get('jumlah') as string)
    const date = data.get('date') as string
    const supplierId = data.get('supplier') as string

    await prisma.$transaction(async (tx) => {
        const barangMasuk = await tx.barangMasuk.findUnique({ where: { id } })
        if (!barangMasuk) throw new Error('Barang masuk tidak ditemukan')

        await tx.barang.update({
            where: { id: barangMasuk.barangId },
            data: {
                jumlah: {
                    increment: jumlah - barangMasuk.jumlah,
                }
            }
        })

        await tx.barangMasuk.update({
            where: { id },
            data: {
                jumlah,
                date: new Date(date),
                supplierId
            }
        })
    })

    revalidateTag('barang-masuk')
}