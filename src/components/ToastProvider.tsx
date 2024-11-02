'use client'

import { Fragment, ReactNode } from "react";
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify";

interface Props {
    children: ReactNode
}

export default function ToastProvider({ children }: Props) {

    return (
        <Fragment>
            {children}
            <ToastContainer
                autoClose={2000}
                closeOnClick
            />
        </Fragment>
    )
}