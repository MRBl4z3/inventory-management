import Input from "@/components/Input";
import Select from "@/components/Select";
import { BarangKeluar, Pembeli } from "@prisma/client";
import { useMemo } from "react";


interface Props {
    barangKeluar: BarangKeluar & { barang: { name: string } }
    pembeli: Pembeli[]
}

export default function UpdateForm({ barangKeluar, pembeli }: Props) {
    const initialDate = useMemo(() => {
        return new Date(barangKeluar.date).toISOString().slice(0, 10)
    }, [barangKeluar])

    return (
        <form className="form-control gap-4" >
            <div className="grid grid-cols-2 gap-x-4">
                <input type="text" name="id" className="hidden" defaultValue={barangKeluar.id} />

                <Input
                    label="Barang"
                    placeholder="barang"
                    defaultValue={barangKeluar.barang.name}
                    disabled
                    className="input-sm"
                />

                <Select
                    label="Pembeli"
                    className="select-sm"
                    defaultValue={barangKeluar.pembeliId}
                >
                    {
                        pembeli.map((pembeli) => {
                            return (
                                <option key={pembeli.id} value={pembeli.id}>{pembeli.name}</option>
                            )
                        })
                    }
                </Select>

                <Input
                    name="jumlah"
                    label="Jumlah"
                    placeholder="jumlah"
                    className="input-sm"
                    defaultValue={barangKeluar.jumlah}
                    required
                />

                <Input
                    name="date"
                    label="Tanggal"
                    placeholder="tanggal"
                    className="input-sm"
                    defaultValue={initialDate}
                    required
                />
            </div>

            <button className="btn btn-success self-end">Edit</button>
        </form>
    )
}