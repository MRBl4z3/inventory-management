import { User, UserRole } from "@prisma/client";
import { createContext } from "react";

const userContext = createContext<Omit<User, 'password'>>({
    id: '',
    name: '',
    nik: '',
    phone: '',
    role: UserRole.Petugas,
    username: ''
})

export default userContext