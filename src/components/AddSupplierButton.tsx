'use client'

import { Fragment, useRef } from "react";
import Modal from "./Modal";
import Input from "./Input";
import addSupplier from "../server/addSupplier";
import { toast } from "react-toastify";

export default function AddSupplierButton() {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)
    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAddSupplier = async (data: FormData) => {
        try {
            await addSupplier(data)
            toast.success('Berhasil menambahkan supplier')
        } catch (error) {
            toast.error('Gagal menambahkan supplier')
        } finally {
            modalRef.current?.close()
            formRef.current?.reset()
        }
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>
            <Modal title="Tambah Supplier" modalRef={modalRef}>
                <form action={handleAddSupplier}>
                    <Input name="code" label="Kode" type="text" placeholder="kode supplier" required />
                    <Input name="name" label="Nama" type="text" placeholder="nama" required />
                    <Input name="address" label="Alamat" type="text" placeholder="alamat" required />
                    <Input name="phone" label="Telepon" type="text" placeholder="telepon" required />
                    <button className="btn btn-success w-full mt-4">Tambahkan</button>
                </form>
            </Modal>
        </Fragment>
    )
}