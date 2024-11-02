'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function deleteUser(data: FormData) {
    const ids = data.getAll('delete') as string[]

    await prisma.user.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidateTag('users')
}