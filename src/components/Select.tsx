import { HTMLProps, ReactNode, RefObject } from "react"


interface Props extends HTMLProps<HTMLSelectElement> {
    label: string
    children: ReactNode
    className?: string
}

export default function Select({ label, children, className, ...selectProps }: Props) {

    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select className={`select select-bordered ${className}`} {...selectProps}>
                {children}
            </select>
        </label>
    )
}