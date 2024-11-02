import { unstable_cache } from "next/cache";
import prisma from "./db";


export default async function getUserById(id: string) {

    const getUserById = unstable_cache(
        async () => await prisma.user.findUnique({
            where: { id }
        }),
        [`users-${id}`],
        { tags: ['users'] }
    )

    return await getUserById()
}