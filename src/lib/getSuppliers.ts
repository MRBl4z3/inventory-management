import { unstable_cache } from "next/cache";
import prisma from "./db";

export default async function getSuppliers(filterBy: string = '', filterKey: string = '') {
    const getSuppliers = unstable_cache(
        async () => {
            try {
                return await prisma.supplier.findMany({
                    where: {
                        [filterBy]: {
                            startsWith: filterKey
                        }
                    }
                })
            } catch (error) {
                return await prisma.supplier.findMany()
            }
        },
        [`suppliers-${filterBy}-${filterKey}`],
        { tags: ['suppliers'] }
    )

    return await getSuppliers()
}