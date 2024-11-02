"use client"

import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default function SuperAdminOnly({ children }: Props) {
    const { data } = useSession()
    if (data?.user.role === UserRole.SuperAdmin) {
        return children
    }
}