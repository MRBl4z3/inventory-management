'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function deleteSupplier(data: FormData) {
    const ids = data.getAll('delete') as string[]

    await prisma.supplier.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidateTag('suppliers')
}