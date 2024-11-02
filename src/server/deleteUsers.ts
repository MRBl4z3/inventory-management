'use server'

import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"


export default async function deleteUsers(data: FormData) {

    const usersIdString = data.get('users') as string
    const usersId = usersIdString.split(',')

    await prisma.user.deleteMany({
        where: {
            id: {
                in: usersId
            }
        }
    })

    revalidateTag('users')
}