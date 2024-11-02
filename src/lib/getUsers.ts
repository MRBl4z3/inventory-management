import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getUsersCount = unstable_cache(
    async () => await prisma.user.count(),
    ['users-count'],
    { tags: ['users-count'] }
)

const getUsers = async (filterBy: string = '', filterKey: string = '') => {
    const getUsers = unstable_cache(
        async () => {
            try {
                return await prisma.user.findMany({
                    where: {
                        [filterBy]: {
                            startsWith: filterKey
                        }
                    }
                })
            } catch (error) {
                return await prisma.user.findMany()
            }
        },
        [`users-${filterBy}-${filterKey}`],
        { tags: ['users'] }
    )

    return await getUsers()
}

export default getUsers