import { ReactNode, RefObject, useRef } from "react"


interface Props {
    modalRef: RefObject<HTMLDialogElement>
    children: ReactNode
    title: string
}

export const useModal = () => {
    const modalRef = useRef<HTMLDialogElement>(null)
    const closeModal = () => {
        modalRef.current?.close()
    }
    const openModal = () => {
        modalRef.current?.showModal()
    }

    return { modalRef, closeModal, openModal }
}

export default function Modal({ modalRef, children, title }: Props) {
    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <p className="text-lg font-semibold">{title}</p>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}