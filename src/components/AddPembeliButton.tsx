'use client'

import { Fragment, useRef } from "react";
import Modal from "./Modal";
import Input from "./Input";
import addPembeli from "../server/addPembeli";
import { toast } from "react-toastify";


export default function AddPembeliButton() {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAddPembeli = async (data: FormData) => {
        try {
            await addPembeli(data)
            toast.success('Berhasil menambahkan data pembeli')
        } catch (error) {
            toast.error('Gagal menambahkan data pembeli')
        } finally {
            modalRef.current?.close()
            formRef.current?.reset()
        }
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>
            <Modal modalRef={modalRef} title="Tambah Pembeli">
                <form action={handleAddPembeli}>
                    <Input name="code" label="Kode" type="text" placeholder="kode pembeli" required />
                    <Input name="name" label="Nama" type="text" placeholder="nama" required />
                    <Input name="address" label="Alamat" type="text" placeholder="alamat" required />
                    <Input name="phone" label="Telepon" type="text" placeholder="telepon" required />
                    <button className="btn btn-success w-full mt-4">Tambahkan</button>
                </form>
            </Modal>
        </Fragment>
    )
}