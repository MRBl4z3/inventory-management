'use client'

import { Fragment, useRef } from "react";
import AddUnitModal from "./AddUnitModal";

export default function AddUnitButton() {
    const addUnitModalRef = useRef<HTMLDialogElement>(null)
    const handleOpenAddUserDialog = () => {
        addUnitModalRef.current?.showModal()
    }

    return (
        <Fragment>
            <button onClick={handleOpenAddUserDialog} className="btn btn-sm btn-success">Tambah</button>
            <AddUnitModal addUnitModalRef={addUnitModalRef} />
        </Fragment>
    )
}