"use server"

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function editJenis(data: FormData) {

    const id = data.get('id') as string
    const name = data.get('name') as string

    await prisma.jenisBarang.update({
        where: { id },
        data: { name }
    })

    revalidateTag('jenis')
}