'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function editSupplier(data: FormData) {
    const id = data.get('id') as string
    const code = data.get('code') as string
    const name = data.get('name') as string
    const address = data.get('address') as string
    const phone = data.get('phone') as string

    await prisma.supplier.update({
        where: { id },
        data: { code, name, address, phone }
    })

    revalidateTag('suppliers')
}