'use client'

import { Fragment, useRef } from "react";
import AddUserModal from "./AddUserModal";

export default function AddUserButton() {
    const addUserModalRef = useRef<HTMLDialogElement>(null)
    const handleOpenAddUserDialog = () => {
        addUserModalRef.current?.showModal()
    }

    return (
        <Fragment>
            <button onClick={handleOpenAddUserDialog} className="btn btn-sm btn-success">Tambah</button>
            <AddUserModal addUserModalRef={addUserModalRef} />
        </Fragment>
    )
}