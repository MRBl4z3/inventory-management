'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function addJenis(data: FormData) {
    const name = data.get('name') as string

    await prisma.jenisBarang.create({
        data: { name }
    })

    revalidateTag('jenis')
}
