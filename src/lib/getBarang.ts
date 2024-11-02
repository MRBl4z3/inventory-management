import { unstable_cache } from "next/cache";
import prisma from "./db";

export type FilterBy = 'name' | 'jenis' | 'unit' | ''

export default async function getBarang(filterBy: FilterBy = '', filterKey: string = '') {

    const getBarang = unstable_cache(
        async () => {
            if (filterBy) {
                if (filterBy === 'name') {
                    return await prisma.barang.findMany({
                        where: {
                            [filterBy]: {
                                startsWith: filterKey
                            }
                        },
                        include: { jenis: true, unit: true }
                    })
                } else if (filterBy === 'jenis') {
                    return await prisma.barang.findMany({
                        where: {
                            jenis: {
                                name: {
                                    startsWith: filterKey
                                }
                            }
                        },
                        include: { jenis: true, unit: true }
                    })
                } else if (filterBy === 'unit') {
                    return await prisma.barang.findMany({
                        where: {
                            unit: {
                                name: {
                                    startsWith: filterKey
                                }
                            }
                        },
                        include: { jenis: true, unit: true }
                    })
                } else {
                    return []
                }
            } else {
                return await prisma.barang.findMany({ include: { jenis: true, unit: true } })
            }
        },
        [`barang-${filterBy}-${filterKey}`],
        { tags: ['barang', 'barang-masuk', 'barang-keluar', 'units', 'jenis'] }
    )

    return await getBarang()
}