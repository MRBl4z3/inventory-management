'use server'

import prisma from "@/lib/db"
import { UserRole } from "@prisma/client"
import { hash } from "bcrypt"
import { revalidateTag } from "next/cache"


export default async function addUser(data: FormData) {
    const nik = data.get('nik') as string
    const name = data.get('name') as string
    const phone = data.get('phone') as string
    const username = data.get('username') as string
    const password = data.get('password') as string
    const role = data.get('role') as UserRole

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
        data: {
            nik,
            name,
            phone,
            username,
            password: hashedPassword,
            role
        }
    })

    revalidateTag('users')
}