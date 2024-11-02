'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function addBarangKeluar(data: FormData) {
    const pembeliId = data.get('pembeli') as string
    const barangId = data.get('barang') as string
    const jumlah = Number(data.get('jumlah') as string)
    const date = data.get('date') as string

    await prisma.$transaction(async () => {
        const barang = await prisma.barang.findUnique({ where: { id: barangId } })

        if (!barang) throw new Error('Barang tidak ditemukan')
        if (barang.jumlah - jumlah < 0) throw new Error('Stok Barang tidak mencukupi')

        await prisma.barang.update({
            where: { id: barang.id },
            data: {
                jumlah: barang.jumlah - jumlah
            }
        })

        await prisma.barangKeluar.create({
            data: { pembeliId, barangId, jumlah, date: new Date(date) }
        })
    })

    revalidateTag('barang-keluar')
}

