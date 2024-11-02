'use client'

import { Fragment, useRef } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { JenisBarang, Unit } from "@prisma/client";
import addBarang from "../server/addBarang";
import { toast } from "react-toastify";

interface Props {
    jenis: JenisBarang[]
    unit: Unit[]
}

export default function AddBarangButton({ jenis, unit }: Props) {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAddBarang = async (data: FormData) => {
        try {
            await addBarang(data)
            toast.success('Berhasil menambahkan data barang')
        } catch (error) {
            toast.error('Gagal menambahkan data barang')
        } finally {
            modalRef.current?.close()
            formRef.current?.reset()
        }
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>

            <Modal modalRef={modalRef} title="Tambah Barang">
                <form ref={formRef} action={handleAddBarang}>
                    <Input
                        name="code"
                        label="Kode"
                        placeholder="kode barang"
                        required
                    />
                    <Input
                        name="name"
                        label="Nama"
                        placeholder="nama barang"
                        required
                    />
                    <label>
                        <div className="label">
                            <span className="label-text">Jenis</span>
                        </div>
                        <select name="jenis" className="select select-bordered w-full">
                            {jenis.map((jenis) => <option key={jenis.id} value={jenis.id}>{jenis.name}</option>)}
                        </select>
                    </label>
                    <Input
                        name="jumlah"
                        label="Jumlah"
                        placeholder="jumlah"
                        required
                        defaultValue={0}
                        className="input-disabled"
                    />
                    <label>
                        <div className="label">
                            <span className="label-text">Satuan</span>
                        </div>
                        <select name="unit" className="select select-bordered w-full">
                            {unit.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                        </select>
                    </label>
                    <button className="btn btn-success w-full mt-4">Konfirmasi</button>
                </form>
            </Modal>
        </Fragment>
    )
}