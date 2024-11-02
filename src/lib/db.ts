import { PrismaClient } from '@prisma/client'


declare module globalThis {
    let prisma: PrismaClient
}

if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient()
}

const prisma = globalThis.prisma
export default prisma
