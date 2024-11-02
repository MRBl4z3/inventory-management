import Main, { MainBody, MainHeader } from "@/layout/Main"
import prisma from "@/lib/db"
import UpdateForm from "./UpdateForm"
import { delay } from "@/lib/delay"

interface Props {
    params: {
        id: string
    }
}

export default async function SupplierDetail({ params }: Props) {
    await delay(1000)

    const supplier = await prisma.supplier.findUnique({
        where: { id: params.id }
    })

    if (!supplier) return <p>Data Supplier Tidak Ditemukan</p>

    return (
        <Main>
            <MainHeader>
                <p>Supplier Detail</p>
            </MainHeader>
            <MainBody>
                <UpdateForm supplier={supplier} />
            </MainBody>
        </Main>
    )
}