import Main, { MainBody, MainHeader } from "@/layout/Main"
import prisma from "@/lib/db"
import UpdateForm from "./UpdateForm"
import getJenis from "@/lib/getJenis"
import getUnits from "@/lib/getUnits"

interface Props {
    params: {
        id: string
    }
}

export default async function BarangDetail({ params }: Props) {
    const jenis = await getJenis()
    const units = await getUnits()
    const barang = await prisma.barang.findUnique({
        where: { id: params.id }
    })

    if (!barang) return <p>Data Barang Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Detail Barang</p>
            </MainHeader>
            <MainBody>
                <UpdateForm
                    jenis={jenis}
                    units={units}
                    barang={barang}
                />
            </MainBody>
        </Main>
    )
}