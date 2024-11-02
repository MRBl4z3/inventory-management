'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function deletePembeli(data: FormData) {
    const ids = data.getAll('delete') as string[]

    await prisma.pembeli.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidateTag('pembeli')
}