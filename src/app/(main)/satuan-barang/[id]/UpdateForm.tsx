'use client'

import Input from "@/components/Input"
import handleAction from "@/lib/handleAction"
import editUnit from "@/server/editUnit"
import { Unit } from "@prisma/client"
import { redirect } from "next/navigation"
import { useCallback } from "react"


interface Props {
    unit: Unit
}

export default function UpdateForm({ unit }: Props) {

    const handleEdit = useCallback(async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: editUnit,
            success: 'Berhasil Mengedit Satuan Barang',
            error: 'Gagal Mengedit Satuan Barang'
        })

        if (isSuccess) return redirect('/satuan-barang')
    }, [])

    return (
        <form action={handleEdit}>
            <div className="grid grid-cols-3">
                <input
                    name="id"
                    defaultValue={unit.id}
                    className="hidden"
                    type="text" />
                <Input
                    name="name"
                    label="Nama"
                    defaultValue={unit.name}
                    placeholder="nama"
                />
            </div>
            <div className="flex justify-end">
                <button className="btn btn-success">Edit</button>
            </div>
        </form>
    )
}