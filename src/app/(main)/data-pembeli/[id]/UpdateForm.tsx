"use client"

import Input from "@/components/Input"
import handleAction from "@/lib/handleAction"
import editPembeli from "@/server/editPembeli"
import { Pembeli } from "@prisma/client"
import { redirect } from "next/navigation"
import { useCallback } from "react"

interface Props {
    pembeli: Pembeli
}

export default function UpdateForm({ pembeli }: Props) {

    const handleEdit = useCallback(async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: editPembeli,
            success: 'Berhasil Mengedit Pembeli',
            error: 'Gagal Mengedit Pembeli',
        })

        if (isSuccess) return redirect('/data-pembeli')
    }, [])

    return (
        <form action={handleEdit} className="form-control gap-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="id"
                    type="text"
                    className="hidden"
                    defaultValue={pembeli.id}
                />
                <Input
                    name="code"
                    label="Kode"
                    placeholder="kode"
                    className="input-sm"
                    defaultValue={pembeli.code}
                />
                <Input
                    name="name"
                    label="Nama"
                    placeholder="nama"
                    className="input-sm"
                    defaultValue={pembeli.name}
                />
                <Input
                    name="address"
                    label="Alamat"
                    placeholder="alamat"
                    className="input-sm"
                    defaultValue={pembeli.address}
                />
                <Input
                    name="phone"
                    label="Telepon"
                    placeholder="telepon"
                    className="input-sm"
                    defaultValue={pembeli.phone}
                />
            </div>
            <button className="btn btn-success self-end">Edit</button>
        </form>
    )
}