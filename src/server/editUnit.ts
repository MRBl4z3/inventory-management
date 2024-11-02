'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"

export default async function editUnit(data: FormData) {
    const id = data.get('id') as string
    const name = data.get('name') as string

    await prisma.unit.update({
        where: { id },
        data: { name }
    })

    revalidateTag('units')
}