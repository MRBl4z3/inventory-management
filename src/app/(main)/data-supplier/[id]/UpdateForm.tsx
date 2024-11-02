"use client"

import Input from "@/components/Input";
import handleAction from "@/lib/handleAction";
import editSupplier from "@/server/editSupplier";
import { Supplier } from "@prisma/client";
import { redirect } from "next/navigation";
import { useCallback } from "react";

interface Props {
    supplier: Supplier
}

export default function UpdateForm({ supplier }: Props) {

    const handleEdit = useCallback(async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: editSupplier,
            success: 'Berhasil Mengedit Supplier',
            error: 'Gagal Mengedit Supplier',
        })

        if (isSuccess) return redirect('/data-supplier')
    }, [])

    return (
        <form action={handleEdit} className="form-control gap-4">
            <div className="grid grid-cols-2 gap-4">
                <input name="id" type="text" className="hidden" defaultValue={supplier.id} />

                <Input
                    name="code"
                    label="Kode"
                    placeholder="kode"
                    className="input-sm"
                    defaultValue={supplier.code}
                />
                <Input
                    name="name"
                    label="Nama"
                    placeholder="nama"
                    className="input-sm"
                    defaultValue={supplier.name}
                />
                <Input
                    name="address"
                    label="Alamat"
                    placeholder="alamat"
                    className="input-sm"
                    defaultValue={supplier.address}
                />
                <Input
                    name="phone"
                    label="Telepon"
                    placeholder="telepon"
                    className="input-sm"
                    defaultValue={supplier.phone}
                />
            </div>

            <button className="btn btn-success self-end">Edit</button>
        </form>
    )
}