import { unstable_cache } from "next/cache";
import prisma from "./db";

export default async function getBarangMasuk(filterBy: string = '', filterKey: string = '') {

    const getBarangMasuk = unstable_cache(
        async () => {
            switch (filterBy) {
                case 'barang':
                    return await prisma.barangMasuk.findMany({
                        where: {
                            barang: {
                                name: {
                                    startsWith: filterKey
                                }
                            }
                        },
                        include: {
                            barang: { select: { name: true } },
                            supplier: { select: { name: true } }
                        }
                    })
                case 'supplier':
                    return await prisma.barangMasuk.findMany({
                        where: {
                            supplier: {
                                name: {
                                    startsWith: filterKey
                                }
                            }
                        },
                        include: {
                            barang: { select: { name: true } },
                            supplier: { select: { name: true } }
                        }
                    })
                default:
                    return await prisma.barangMasuk.findMany({
                        include: {
                            barang: { select: { name: true } },
                            supplier: { select: { name: true } }
                        }
                    })
            }
        },
        [`barang-masuk-${filterBy}-${filterKey}`],
        { tags: ['barang-masuk'] }
    )

    const barangMasuk = await getBarangMasuk()
    const _ = barangMasuk.map(({ barang, supplier, date, ...rest }) => {
        return {
            barang: {
                name: barang.name
            },
            supplier: {
                name: supplier.name
            },
            ...rest,
            date: new Date(date).toLocaleDateString()
        }
    })

    return _
}