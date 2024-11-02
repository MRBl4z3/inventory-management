'use client'

import addUser from "../server/addUser"
import { UserRole } from "@prisma/client"
import { RefObject, useRef } from "react"
import { toast } from "react-toastify"


interface Props {
    addUserModalRef: RefObject<HTMLDialogElement>
}

export default function AddUserModal({ addUserModalRef }: Props) {
    const addUserFormRef = useRef<HTMLFormElement>(null)

    const handleAddUser = async (data: FormData) => {
        try {
            await addUser(data)
            toast.success('Berhasil menambahkan pengguna')
        } catch (error) {
            toast.error('Gagal menambahkan pengguna')
        } finally {
            addUserModalRef.current?.close()
            addUserFormRef.current?.reset()
        }
    }

    return (
        <dialog className="modal" ref={addUserModalRef}>
            <div className="modal-box">
                <p className="text-lg font-semibold">Tambah Pengguna</p>
                <form action={handleAddUser} ref={addUserFormRef}>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">NIK</span>
                        </div>
                        <input className="input input-bordered" type="text" placeholder="nik" required name="nik" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Nama</span>
                        </div>
                        <input className="input input-bordered" type="text" placeholder="nama" required name="name" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Telepon</span>
                        </div>
                        <input className="input input-bordered" type="text" placeholder="telepon" required name="phone" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input className="input input-bordered" type="text" placeholder="username" required name="username" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input className="input input-bordered" placeholder="password" type="text" required name="password" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select className="select select-bordered" required name="role">
                            <option value={UserRole.Petugas}>{UserRole.Petugas}</option>
                            <option value={UserRole.Admin}>{UserRole.Admin}</option>
                            <option value={UserRole.SuperAdmin}>{UserRole.SuperAdmin}</option>
                        </select>
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