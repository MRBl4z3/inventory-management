import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";



export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Satuan Barang</p>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Nama']}
                />
            </MainBody>
        </Main>
    )
}