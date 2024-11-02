import Main, { MainBody, MainHeader } from "@/layout/Main";
import prisma from "@/lib/db";
import UpdateForm from "./UpdateForm";
import getPembeli from "@/lib/getPembeli";
import { delay } from "@/lib/delay";


interface Props {
    params: {
        id: string
    }
}

export default async function BarangKeluarDetail({ params }: Props) {
    await delay(1000)
    const pembeli = await getPembeli()
    const barangKeluar = await prisma.barangKeluar.findUnique({
        where: { id: params.id },
        include: {
            barang: { select: { name: true } }
        }
    })

    if (!barangKeluar) return <p>Data Barang Keluar Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Detail Barang Keluar</p>
            </MainHeader>
            <MainBody>
                <UpdateForm barangKeluar={barangKeluar} pembeli={pembeli} />
            </MainBody>
        </Main>
    )
}