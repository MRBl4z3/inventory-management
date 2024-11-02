'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function addBarangMasuk(data: FormData) {
    const supplierId = data.get('supplier') as string
    const barangId = data.get('barang') as string
    const jumlah = Number(data.get('jumlah') as string)
    const date = new Date(data.get('date') as string)

    await prisma.$transaction(async (tx) => {
        await tx.barang.update({
            where: { id: barangId },
            data: {
                jumlah: {
                    increment: jumlah
                }
            }
        })

        await tx.barangMasuk.create({
            data: {
                supplierId,
                barangId,
                jumlah,
                date: new Date(date)
            }
        })
    })

    revalidateTag('barang-masuk')

}