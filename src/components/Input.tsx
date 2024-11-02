'use client'

import { ChangeEvent, HTMLProps, useState } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
    label: string
    className?: string
}

export const useInput = (initial?: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initial || '')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return [value, onChange]
}

export default function Input({ label, className, ...inputProps }: Props) {


    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input className={`input input-bordered ${className}`}  {...inputProps} />
        </label>
    )
}