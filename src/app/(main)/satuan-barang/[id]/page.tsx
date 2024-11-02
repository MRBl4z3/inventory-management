import Main, { MainBody, MainHeader } from "@/layout/Main";
import prisma from "@/lib/db";
import UpdateForm from "./UpdateForm";
import { delay } from "@/lib/delay";


interface Props {
    params: {
        id: string
    }
}

export default async function SatuanBarangDetail({ params }: Props) {
    await delay(1000)
    const unit = await prisma.unit.findUnique({
        where: { id: params.id }
    })

    if (!unit) return <p>Satuan Barang Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Detail Satuan Barang</p>
            </MainHeader>
            <MainBody>
                <UpdateForm unit={unit} />
            </MainBody>
        </Main>
    )
}