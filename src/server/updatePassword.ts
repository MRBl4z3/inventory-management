'use server'

import prisma from "@/lib/db"
import getUserById from "@/lib/getUserById"
import { compare, hash } from "bcrypt"

export default async function updatePassword(data: FormData) {

    const id = data.get('id') as string
    const oldPassword = data.get('old-password') as string
    const newPassword = data.get('new-password') as string

    const user = await getUserById(id)
    if (!user) throw new Error('Pengguna tidak ditemukan')

    const isPasswordMatch = await compare(oldPassword, user.password)
    if (!isPasswordMatch) throw new Error('Password salah')

    const hashed = await hash(newPassword, 8)
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashed
        }
    })
}