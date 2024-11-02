'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function addUnit(data: FormData) {

    const name = data.get('name') as string

    await prisma.unit.create({
        data: { name }
    })

    revalidateTag('units')
}