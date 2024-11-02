import { unstable_cache } from "next/cache";
import prisma from "./db";




export default async function getUnits(filter_by: string = '', filter_key: string = '') {
    const getUnits = unstable_cache(
        async () => {
            try {
                return await prisma.unit.findMany({
                    where: {
                        [filter_key]: {
                            startsWith: filter_by
                        }
                    }
                })
            } catch (error) {
                return await prisma.unit.findMany()
            }
        },
        [`units-${filter_by}-${filter_key}`],
        { tags: ['units'] }
    )

    return await getUnits()
}