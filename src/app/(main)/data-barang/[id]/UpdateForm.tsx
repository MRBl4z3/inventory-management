'use client'

import Input from "@/components/Input";
import Select from "@/components/Select";
import handleAction from "@/lib/handleAction";
import editBarang from "@/server/editBarang";
import { Barang, JenisBarang, Unit } from "@prisma/client";
import { redirect } from "next/navigation";
import { useCallback } from "react";

interface Props {
    barang: Barang
    jenis: JenisBarang[]
    units: Unit[]
}

export default function UpdateForm({ barang, jenis, units }: Props) {

    const handleEdit = useCallback(async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: editBarang,
            success: 'Berhasil Mengedit Barang',
            error: 'Gagal Mengedit Barang',
        })

        if (isSuccess) return redirect('/data-barang')
    }, [])

    return (
        <form className="form-control" action={handleEdit}>
            <div className="grid grid-cols-2 gap-x-4">
                <input name="id" type="text" className="hidden" defaultValue={barang.id} />

                <Input
                    required
                    name="code"
                    label="Kode"
                    placeholder="kode"
                    className="input-sm"
                    defaultValue={barang.code}
                />

                <Input
                    required
                    name="name"
                    label="Nama"
                    placeholder="nama"
                    className="input-sm"
                    defaultValue={barang.name}
                />

                <Input
                    disabled
                    label="Jumlah"
                    className="input-sm"
                    defaultValue={barang.jumlah}
                />

                <Select
                    name="jenis"
                    label="Jenis"
                    defaultValue={barang.jenisId}
                    className="select-sm"
                >
                    {
                        jenis.map((jenis) => {
                            return (
                                <option
                                    key={jenis.id}
                                    value={jenis.id}
                                >{jenis.name}</option>
                            )
                        })
                    }
                </Select>

                <Select
                    name="unit"
                    label="Satuan"
                    defaultValue={barang.satuanId}
                    className="select-sm"
                >
                    {
                        units.map((unit) => {
                            return (
                                <option
                                    key={unit.id}
                                    value={unit.id}
                                >{unit.name}</option>
                            )
                        })
                    }
                </Select>
            </div>

            <button className="btn btn-success self-end">Edit</button>
        </form>
    )
}