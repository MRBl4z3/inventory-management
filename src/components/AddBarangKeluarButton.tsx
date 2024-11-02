'use client'

import { Fragment, useRef } from "react";
import Modal from "./Modal";
import Select from "./Select";
import { Barang, Pembeli } from "@prisma/client";
import Input from "./Input";
import addBarangKeluar from "../server/addBarangKeluar";
import { toast } from "react-toastify";

interface Props {
    pembeli: Pembeli[]
    barang: Barang[]
}

export default function AddBarangKeluarButton({ barang, pembeli }: Props) {
    const formRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleOpenModal = () => {
        modalRef.current?.showModal()
    }

    const handleAdd = async (data: FormData) => {
        try {
            await addBarangKeluar(data)
            toast.success('Berhasil menambahkan data')
        } catch (error) {
            if ((error as { message: string }).message) {
                toast.error((error as { message: string }).message)
            }
        } finally {
            modalRef.current?.close()
            formRef.current?.reset()
        }
    }

    return (
        <Fragment>
            <button onClick={handleOpenModal} className="btn btn-sm btn-success">Tambah</button>
            <Modal modalRef={modalRef} title="Tambah Barang Keluar">
                <form action={handleAdd} ref={formRef} className="form-control">
                    <Select label="Pembeli" name="pembeli">
                        {pembeli.map((pembeli) => {
                            return <option key={pembeli.id} value={pembeli.id}>{pembeli.name}</option>
                        })}
                    </Select>
                    <Select label="Barang" name="barang">
                        {barang.map((barang) => {
                            return <option key={barang.id} value={barang.id}>{barang.name}</option>
                        })}
                    </Select>
                    <Input
                        name="jumlah"
                        label="Jumlah"
                        type="number"
                        placeholder="jumlah"
                        defaultValue={0}
                        required />
                    <Input
                        name="date"
                        label="Tanggal"
                        type="date"
                        placeholder="tanggal"
                        required />
                    <button className="btn btn-success w-full mt-4">Konfirmasi</button>
                </form>
            </Modal>
        </Fragment>
    )
}