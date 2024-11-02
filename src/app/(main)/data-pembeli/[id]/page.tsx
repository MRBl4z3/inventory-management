import Main, { MainBody, MainHeader } from "@/layout/Main";
import prisma from "@/lib/db";
import UpdateForm from "./UpdateForm";
import { delay } from "@/lib/delay";

interface Props {
    params: {
        id: string
    }
}

export default async function PembeliDetail({ params }: Props) {
    await delay(1000)
    const pembeli = await prisma.pembeli.findUnique({
        where: { id: params.id }
    })

    if (!pembeli) return <p>Data Pembeli Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Detail Pembeli</p>
            </MainHeader>
            <MainBody>
                <UpdateForm pembeli={pembeli} />
            </MainBody>
        </Main>
    )
}