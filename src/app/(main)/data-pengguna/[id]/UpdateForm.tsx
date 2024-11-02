"use client"

import Input from "@/components/Input";
import { User, UserRole } from "@prisma/client";
import editUser from "../../../../server/editUser";
import handleAction from "@/lib/handleAction";
import Select from "@/components/Select";
import { redirect } from "next/navigation";
import { Fragment } from "react";

interface Props {
    user: User
}

export default function UpdateForm({ user }: Props) {
    const handleEdit = async (data: FormData) => {
        const isSuccess = await handleAction({
            action: editUser,
            data,
            success: 'Berhasil mengedit user',
            error: 'Gagal mengedit user'
        })

        if (isSuccess) return redirect('/data-pengguna')
    }

    return (
        <Fragment>
            <form action={handleEdit} className="form-control ">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="id"
                        className="hidden"
                        defaultValue={user.id}
                    />
                    <Input
                        name="nik"
                        label="NIK"
                        placeholder="nik"
                        className="input-sm"
                        defaultValue={user.nik}
                    />
                    <Input
                        name="name"
                        label="Nama"
                        placeholder="nama"
                        className="input-sm"
                        defaultValue={user.name}
                    />
                    <Input
                        name="phone"
                        label="Telepon"
                        placeholder="telepon"
                        className="input-sm"
                        defaultValue={user.phone}
                    />
                    <Input
                        name="username"
                        label="Username"
                        placeholder="username"
                        className="input-sm"
                        defaultValue={user.username}
                    />
                    <Input
                        name="password"
                        label="Password"
                        placeholder="password"
                        className="input-sm"
                        defaultValue={user.password}
                    />
                    <Select
                        name="role"
                        label="Level"
                        className="select-sm"
                        defaultValue={user.role}
                    >
                        {Object.keys(UserRole).map((role) => {
                            return <option key={role} value={role}>{role}</option>
                        })}
                    </Select>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button className="btn  btn-success">Edit</button>
                </div>
            </form>
        </Fragment>
    )
}