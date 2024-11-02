'use client'

import Link from "next/link"
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react"
import Radio, { useRadio } from "./Radio"
import { useInput } from "./Input"
import useLiveSearch from "@/hooks/useLiveSearch"
import useCheckbox from "@/hooks/useCheckbox"
import Modal, { useModal } from "./Modal"
import handleAction from "@/lib/handleAction"
import useBoolean from "@/hooks/useBoolean"

interface FilterBy {
    key: string
    label: string
    checked?: boolean
}

interface TableProps {
    name: string
    cols: string[]
    data: { id: string, [key: string]: any }[]
    detailPath: string
    filterBy: FilterBy[]
    identifier: string
    deleteAction: (data: FormData) => Promise<void>
}


export default function Table({ name, cols, data, detailPath, filterBy, identifier, deleteAction }: TableProps) {
    const initialFilterKey = useMemo(() => {
        const initial = filterBy.filter(filterBy => {
            return filterBy.checked !== undefined
        })
        return initial[0]
    }, [filterBy])

    const submitRef = useRef<HTMLButtonElement>(null)
    const [filterKey, onFilterChange] = useRadio(initialFilterKey.key)
    const [filterValue, setFilterValue] = useInput('')
    const [selectedDataId, onSelectedDataIdChange, setSelectedDataId] = useCheckbox()
    const { closeModal, modalRef, openModal } = useModal()
    const [selectAll, setSelectAll] = useBoolean()

    const handleDelete = useCallback(async (data: FormData) => {
        handleAction({
            data,
            action: deleteAction,
            success: `Berhasil Menghapus ${name}`,
            error: `Gagal Menghapus ${name}`
        })
    }, [])

    const selectedData = useMemo(() => {
        const filtered = data.filter((data) => {
            return selectedDataId.includes(data.id)
        })
        return filtered
    }, [selectedDataId])

    const onDeleteConfirmation = () => {
        submitRef.current?.click()
        modalRef.current?.close()
        setSelectedDataId([])
    }

    useEffect(() => {
        if (selectAll) {
            const dataIds = data.map(({ id }) => id)
            setSelectedDataId(dataIds)
        } else {
            setSelectedDataId([])
        }
    }, [selectAll])

    useLiveSearch(filterKey, filterValue)

    return (
        <Fragment>
            <div className="flex justify-between w-full flex-col gap-2 md:flex-row">
                <div className="flex gap-2 overflow-auto">
                    {filterBy.map((fKey) => {
                        return (
                            <Radio
                                key={fKey.key}
                                name="filter"
                                label={fKey.label}
                                value={fKey.key}
                                checked={fKey.key === filterKey}
                                onChange={onFilterChange}
                            />
                        )
                    })}
                </div>
                <input
                    value={filterValue}
                    onChange={setFilterValue}
                    type="text"
                    placeholder="filter..."
                    className="input input-sm input-bordered" />
            </div>
            <form action={handleDelete} className="w-full overflow-auto">
                <table className="table table-xs my-2">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onClick={() => setSelectAll()}
                                    defaultChecked={selectedDataId.length === data.length}
                                    className="checkbox checkbox-sm checked:checkbox-warning"
                                />
                            </th>
                            <th>No</th>
                            {cols.map((col) => {
                                return <th key={col}>{col}</th>
                            })}
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data, i) => {
                                return <tr key={data.id}>
                                    <td>
                                        <input
                                            name="delete"
                                            value={data.id}
                                            type="checkbox"
                                            checked={selectedDataId.includes(data.id)}
                                            onChange={onSelectedDataIdChange}
                                            className="checkbox checkbox-sm checked:checkbox-warning" />
                                    </td>
                                    <td>{i + 1}</td>
                                    {Object.keys(data).map((key) => {
                                        if (key !== 'id' && !key.includes('Id')) {
                                            if (typeof data[key] !== 'object') {
                                                return <td key={`${data.id}${key}`}>
                                                    {data[key]}
                                                </td>
                                            } else {

                                                const subData = data[key]
                                                return Object.keys(subData).map((key) => {
                                                    if (key !== 'id')
                                                        return <td key={`${data.id}${subData[key]}`}>{subData[key]}</td>
                                                })
                                            }
                                        }
                                    })}
                                    <td>
                                        <Link
                                            href={`${detailPath}/${data.id}`}
                                            className="btn btn-sm btn-primary">
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button ref={submitRef} className="hidden"></button>
            </form>
            <button
                onClick={openModal}
                disabled={selectedDataId[0] === undefined}
                className="btn btn-sm btn-warning mt-2">
                Hapus {name}
            </button>

            <Modal modalRef={modalRef} title={`Hapus ${name}`} >
                <p className="my-4 capitalize">Apakah anda yakin ingin menghapus {name} :</p>
                <ul className="list-disc ml-4">
                    {selectedData.map((data) => {
                        return <li key={'list' + data.id}>
                            <p>{data[identifier]}</p>
                        </li>
                    })}
                </ul>
                <div className="flex justify-end gap-4">
                    <button className="btn" onClick={closeModal}>Tidak</button>
                    <button className="btn btn-error" onClick={onDeleteConfirmation}>Ya</button>
                </div>
            </Modal>
        </Fragment>
    )
}