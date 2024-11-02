import { unstable_cache } from "next/cache";
import prisma from "./db";


export default async function getPembeli(filterBy: string = '', filterKey: string = '') {

    const getPembeli = unstable_cache(
        async () => {
            try {
                return await prisma.pembeli.findMany({
                    where: {
                        [filterBy]: {
                            startsWith: filterKey
                        }
                    }
                })
            } catch (error) {
                return await prisma.pembeli.findMany()
            }
        },
        [`pembeli-${filterBy}-${filterKey}`],
        { tags: ['pembeli'] }
    )

    return await getPembeli()
}