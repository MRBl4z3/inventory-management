import prisma from "@/lib/db"
import { compare } from "bcrypt"
import { getServerSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.role = user.role
            }

            return token
        },
        session: async ({ session, token }) => {
            session.user.id = token.id
            session.user.role = token.role

            return session
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { placeholder: 'username', label: 'Username' },
                password: { placeholder: 'password', label: 'Password' }
            },
            async authorize(credentials) {
                const username = credentials?.username || ''
                const password = credentials?.password || ''

                const user = await prisma.user.findUnique({
                    where: { username }
                })

                if (!user) return null
                const isPasswordMatch = await compare(password, user.password)

                if (!isPasswordMatch) return null

                return {
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
            }
        })
    ]
}

export const getAuthServerSession = () => {
    return getServerSession(authOptions)
}