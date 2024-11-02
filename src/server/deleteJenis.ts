'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function deleteJenis(data: FormData) {
    const ids = data.getAll('delete') as string[]

    await prisma.jenisBarang.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidateTag('jenis')
}