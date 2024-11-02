'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"



export default async function addBarang(data: FormData) {
    const code = data.get('code') as string
    const name = data.get('name') as string
    const jenis = data.get('jenis') as string
    const unit = data.get('unit') as string

    await prisma.barang.create({
        data: {
            code,
            name,
            jumlah: 0,
            jenisId: jenis,
            satuanId: unit
        }
    })

    revalidateTag('barang')
}