'use client'

import addJenis from "../server/addJenis";
import { Fragment, useRef } from "react";
import { toast } from "react-toastify";

export default function AddJenisButton() {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)
    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAddJenis = async (data: FormData) => {
        await addJenis(data)
        modalRef.current?.close()
        formRef.current?.reset()
        toast.success('Berhasil menambahkan jenis barang')
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <p className="text-lg font-semibold">Tambah Jenis Barang</p>
                    <form action={handleAddJenis} ref={formRef}>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Jenis</span>
                            </div>
                            <input className="input input-bordered" type="text" placeholder="jenis" required name="name" />
                        </label>
                        <button className="btn btn-success mt-4 w-full">Konfirmasi</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </Fragment>
    )
}