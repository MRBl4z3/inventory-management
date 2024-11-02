const {PrismaClient, UserRole } = require('@prisma/client')
const {hash} = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    const password = await hash('12345678', 8)
    const root = await prisma.user.create({
        data: {
            nik: '0001',
            name: 'Rio Nur Ramadhan',
            phone: '085822315630',
            username: 'admin',
            password: password,
            role: UserRole.SuperAdmin,
        }
    })
}

main()
