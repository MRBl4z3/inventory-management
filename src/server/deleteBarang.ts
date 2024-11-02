'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function deleteBarang(data: FormData) {

    const id = data.get('id') as string

    await prisma.barang.delete({
        where: { id }
    })

    revalidateTag('barang')
}
