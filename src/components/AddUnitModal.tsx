'use client'

import addUnit from "../server/addUnit"
import { RefObject, useRef } from "react"
import { toast } from "react-toastify"

interface Props {
    addUnitModalRef: RefObject<HTMLDialogElement>
}

export default function AddUnitModal({ addUnitModalRef }: Props) {
    const addUnitFormRef = useRef<HTMLFormElement>(null)

    const handleAddUnit = async (data: FormData) => {
        try {
            await addUnit(data)
            toast.success('Berhasil menambahkan satuan barang')
        } catch (error) {
            toast.error('Gagal menambahkan satuan barang')
        } finally {
            addUnitModalRef.current?.close()
            addUnitFormRef.current?.reset()
        }

    }

    return (
        <dialog className="modal" ref={addUnitModalRef}>
            <div className="modal-box">
                <p className="text-lg font-semibold">Tambah Satuan Barang</p>
                <form action={handleAddUnit} ref={addUnitFormRef}>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Satuan</span>
                        </div>
                        <input className="input input-bordered" type="text" placeholder="pcs" required name="name" />
                    </label>
                    <button className="btn btn-success mt-4 w-full">Konfirmasi</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}