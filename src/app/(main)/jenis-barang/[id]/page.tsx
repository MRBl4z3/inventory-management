import Main, { MainBody, MainHeader } from "@/layout/Main";
import prisma from "@/lib/db";
import UpdateForm from "./UpdateForm";
import { delay } from "@/lib/delay";

interface Props {
    params: {
        id: string
    }
}


export default async function JenisBarangDetailPage({ params }: Props) {
    await delay(1000)
    const jenisBarang = await prisma.jenisBarang.findUnique({
        where: { id: params.id }
    })

    if (!jenisBarang) {
        return (<main><p>Jenis Barang Tidak Ditemukan</p></main>)
    }


    return (
        <Main>
            <MainHeader>
                <p>Detail Jenis Barang</p>
            </MainHeader>
            <MainBody>
                <UpdateForm jenisBarang={jenisBarang} />
            </MainBody>
        </Main>
    )
}
