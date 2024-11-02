import { UserRole } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";



declare module 'next-auth' {

    interface Session extends DefaultSession {
        user: {
            id: string,
            name: string
            role: UserRole
        }
    }

    interface User extends DefaultUser {
        id: string,
        role: UserRole
    }
}

declare module 'next-auth/jwt' {

    interface JWT extends DefaultJWT {
        id: string
        role: UserRole
    }
}