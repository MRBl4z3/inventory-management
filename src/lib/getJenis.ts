import { unstable_cache } from "next/cache";
import prisma from "./db";



export default async function getJenis(filter_key: string = '', filter_value: string = '') {
    const getTypes = unstable_cache(
        async () => {
            try {
                return await prisma.jenisBarang.findMany({
                    where: {
                        [filter_key]: {
                            startsWith: filter_value
                        }
                    }
                })
            } catch (error) {
                return await prisma.jenisBarang.findMany()
            }
        },
        [`jenis-${filter_key}-${filter_value}`],
        { tags: ['jenis'] }
    )

    return await getTypes()
}