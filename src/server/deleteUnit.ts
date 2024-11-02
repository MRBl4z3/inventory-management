'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"




export default async function deleteUnit(data: FormData) {
    const ids = data.getAll('delete') as string[]

    await prisma.unit.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidateTag('units')
}