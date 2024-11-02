'use server'

import prisma from "@/lib/db"
import { UserRole } from "@prisma/client"
import { revalidateTag } from "next/cache"


export default async function editUser(data: FormData) {
    const id = data.get('id') as string
    const nik = data.get('nik') as string
    const name = data.get('name') as string
    const phone = data.get('phone') as string
    const username = data.get('username') as string
    const password = data.get('password') as string
    const role = data.get('role') as UserRole

    await prisma.user.update({
        where: { id },
        data: {
            nik: nik || undefined,
            name: name || undefined,
            phone: phone || undefined,
            username: username || undefined,
            role: role || undefined,
            password: password || undefined
        }
    })

    revalidateTag('users')
}