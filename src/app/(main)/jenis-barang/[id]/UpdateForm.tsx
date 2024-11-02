'use client'

import Input from "@/components/Input"
import handleAction from "@/lib/handleAction"
import editJenis from "@/server/editJenis"
import { JenisBarang } from "@prisma/client"
import { redirect } from "next/navigation"

export default function UpdateForm({ jenisBarang }: { jenisBarang: JenisBarang }) {


    const handleEdit = async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: editJenis,
            success: 'Berhasil Mengedit Jenis Barang',
            error: 'Gagal Mengedit Jenis Barang'
        })

        if (isSuccess) return redirect('/jenis-barang')
    }

    return (
        <form action={handleEdit} >
            <div className="grid grid-cols-3">
                <input type="text" defaultValue={jenisBarang.id} name="id" className="hidden" />
                <Input
                    name="name"
                    label="Nama"
                    defaultValue={jenisBarang.name}
                    className="input-sm"
                />
            </div>
            <div className="flex justify-end">
                <button className="btn btn-success">Edit</button>
            </div>
        </form>
    )
}