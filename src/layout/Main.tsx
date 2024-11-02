import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function MainHeader({ children }: Props) {

    return (
        <div className="bg-base-300 p-4 flex justify-between items-center">
            {children}
        </div>
    )
}

export function MainBody({ children }: Props) {
    return (
        <div className="bg-base-100 p-4">
            {children}
        </div>
    )
}

export default function Main({ children }: Props) {

    return (
        <div className="shadow rounded-md flex flex-col">
            {children}
        </div>
    )
}