import { unstable_cache } from "next/cache";
import prisma from "./db";


export default async function getBarangKeluar(filterBy: string = '', filterKey: string = '') {

    const getBarangKeluar = unstable_cache(
        async () => {
            if (filterBy === 'barang') {
                return await prisma.barangKeluar.findMany({
                    where: {
                        barang: {
                            name: {
                                startsWith: filterKey
                            }
                        }
                    },
                    include: {
                        barang: { select: { name: true } },
                        pembeli: { select: { name: true } },
                    }
                })
            } else if (filterBy === 'pembeli') {
                return await prisma.barangKeluar.findMany({
                    where: {
                        pembeli: {
                            name: {
                                startsWith: filterKey
                            }
                        }
                    },
                    include: {
                        barang: { select: { name: true } },
                        pembeli: { select: { name: true } },
                    }
                })
            } else {
                return await prisma.barangKeluar.findMany({
                    include: {
                        barang: { select: { name: true } },
                        pembeli: { select: { name: true } },
                    }
                })
            }
        },
        [`barang-keluar-${filterBy}-${filterKey}`],
        { tags: ['barang-keluar'] }
    )

    const barangKeluar = await getBarangKeluar()
    return barangKeluar.map(({ pembeli, barang, date, ...rest }) => {
        return {
            barang,
            pembeli,
            ...rest,
            date: new Date(date).toLocaleDateString()
        }
    })

}