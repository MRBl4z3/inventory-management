'use client'

import { ChangeEvent, useState } from "react"

interface Props {
    name: string
    label: string
    value: string
    checked?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useRadio = (initial?: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initial || '')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return [value, onChange]
}

export default function Radio({ name, label, value, checked, onChange }: Props) {

    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text-alt mr-2">{label}</span>
                <input
                    type="radio"
                    className="radio radio-sm checked:bg-info"
                    name={name}
                    value={value}
                    defaultChecked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}