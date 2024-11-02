'use client'

import userContext from "@/context/userContext"
import { User } from "@prisma/client"
import { ReactNode } from "react"

interface Props {
    value: Omit<User, 'password'>
    children: ReactNode
}

export default function UserProvider({ children, value }: Props) {

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}