import Main, { MainBody, MainHeader } from "@/layout/Main"
import prisma from "@/lib/db"
import UpdateForm from "./UpdateForm"
import getSuppliers from "@/lib/getSuppliers"
import { delay } from "@/lib/delay"

interface Props {
    params: {
        id: string
    }
}

export default async function barangMasukDetail({ params }: Props) {
    await delay(1000)
    const suppliers = await getSuppliers()
    const barangMasuk = await prisma.barangMasuk.findUnique({
        where: { id: params.id },
        include: {
            barang: { select: { name: true } },
            supplier: { select: { name: true } }
        }
    })

    if (!barangMasuk) return <p>Data Barang Masuk Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Detail Barang Masuk</p>
            </MainHeader>
            <MainBody>
                <UpdateForm barangMasuk={barangMasuk} suppliers={suppliers} />
            </MainBody>
        </Main>
    )
}