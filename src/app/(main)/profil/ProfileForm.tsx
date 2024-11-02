'use client'

import Input from "@/components/Input"
import userContext from "@/context/userContext"
import handleAction from "@/lib/handleAction"
import editUser from "@/server/editUser"
import { User } from "@prisma/client"
import Link from "next/link"
import { useCallback, useContext } from "react"

export default function ProfileForm() {
    const user = useContext(userContext)

    const handleEdit = useCallback(async (data: FormData) => {
        await handleAction({
            data,
            action: editUser,
            success: 'Berhasil Mengedit User',
            error: 'Gagal Mengedit User'
        })
    }, [])

    return (
        <form action={handleEdit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="id"
                    className="hidden"
                    defaultValue={user.id}
                />
                <Input
                    label="NIK"
                    placeholder="nik"
                    className="input-sm"
                    defaultValue={user.nik}
                    disabled
                />
                <Input
                    name="name"
                    label="Nama"
                    placeholder="nama"
                    className="input-sm"
                    defaultValue={user.name}
                />
                <Input
                    name="phone"
                    label="Telepon"
                    placeholder="telepon"
                    className="input-sm"
                    defaultValue={user.phone}
                />
                <Input
                    name="username"
                    label="Username"
                    placeholder="username"
                    className="input-sm"
                    defaultValue={user.username}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Link href={'/profil/ganti-password'} className="btn btn-warning self-end">Ganti Password</Link>
                <button className="btn btn-success self-end">Edit</button>
            </div>
        </form>
    )
}