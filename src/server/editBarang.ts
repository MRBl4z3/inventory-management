'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function editBarang(data: FormData) {
    const id = data.get('id') as string
    const code = data.get('code') as string
    const name = data.get('name') as string
    const jenis = data.get('jenis') as string
    const unit = data.get('unit') as string

    await prisma.barang.update({
        where: { id },
        data: {
            code,
            name,
            jenisId: jenis,
            satuanId: unit
        }
    })

    revalidateTag('barang')
}