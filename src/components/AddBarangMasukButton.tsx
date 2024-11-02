'use client'

import { Fragment, useRef } from "react";
import Modal from "./Modal";
import { Barang, Supplier } from "@prisma/client";
import Input from "./Input";
import addBarangMasuk from "../server/addBarangMasuk";
import { toast } from "react-toastify";

interface Props {
    barang: Barang[]
    suppliers: Supplier[]
}

export default function AddBarangMasukButton({ suppliers, barang }: Props) {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAddBarangMasuk = async (data: FormData) => {
        try {
            await addBarangMasuk(data)
            toast.success('Berhasil menambahkan transaksi masuk')
        } catch (error) {
            toast.error('Gagal menambahkan transaksi masuk')
        } finally {
            modalRef.current?.close()
            formRef.current?.reset()
        }
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>
            <Modal modalRef={modalRef} title="Tambah Barang Masuk">
                <form action={handleAddBarangMasuk} ref={formRef} className="form-control">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Supplier</span>
                        </div>
                        <select name="supplier" className="select select-bordered">
                            {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
                        </select>
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Barang</span>
                        </div>
                        <select name="barang" className="select select-bordered">
                            {barang.map((barang) => <option key={barang.id} value={barang.id}>{barang.name}</option>)}
                        </select>
                    </label>
                    <Input
                        label="Jumlah"
                        placeholder="jumlah"
                        type="number"
                        name="jumlah"
                        required
                    />
                    <Input
                        label="Tanggal"
                        placeholder="Tanggal"
                        type="date"
                        name="date"
                        required
                    />
                    <button className="btn btn-success mt-4 w-full">Konfirmasi</button>
                </form>
            </Modal>
        </Fragment>
    )
}