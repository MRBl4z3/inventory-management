"use client"

import Input from "@/components/Input"
import Select from "@/components/Select"
import handleAction from "@/lib/handleAction"
import editBarangMasuk from "@/server/editBarangMasuk"
import { BarangMasuk, Supplier } from "@prisma/client"
import { redirect } from "next/navigation"
import { useCallback, useMemo } from "react"

interface Props {
    barangMasuk: BarangMasuk & { barang: { name: string } }
    suppliers: Supplier[]
}

export default function UpdateForm({ barangMasuk, suppliers }: Props) {

    const initialDate = useMemo(() => {
        return new Date(barangMasuk.date).toISOString().slice(0, 10)
    }, [barangMasuk])

    const handleEdit = useCallback(async (data: FormData) => {

        const isSuccess = await handleAction({
            data,
            action: editBarangMasuk,
            success: 'Berhasil Mengedit Barang Masuk',
            error: 'Gagal Mengedit Barang Keluar'
        })

        if (isSuccess) return redirect('/barang-masuk')
    }, [])


    return (
        <form action={handleEdit} className="form-control gap-4">
            <div className="grid grid-cols-2 gap-x-4">
                <input type="text" name="id" className="hidden" defaultValue={barangMasuk.id} />

                <Input
                    label="Barang"
                    placeholder="kode"
                    className="input-sm"
                    defaultValue={barangMasuk.barang.name}
                    disabled
                />

                <Select
                    name="supplier"
                    label="Supplier"
                    className="select-sm"
                    defaultValue={barangMasuk.supplierId}
                >
                    {
                        suppliers.map((supplier) => {
                            return (
                                <option
                                    key={supplier.id}
                                    value={supplier.id}
                                >
                                    {supplier.name}
                                </option>
                            )
                        })
                    }
                </Select>

                <Input
                    name="jumlah"
                    label="Jumlah"
                    placeholder="jumlah"
                    className="input-sm"
                    defaultValue={barangMasuk.jumlah}
                />

                <Input
                    name="date"
                    label="Tanggal"
                    type="date"
                    className="input-sm"
                    defaultValue={initialDate}
                />
            </div>
            <button className="btn btn-success self-end">Edit</button>
        </form>
    )
}