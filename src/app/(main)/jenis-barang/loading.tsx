import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";



export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Jenis Barang</p>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Jenis']}
                />
            </MainBody>
        </Main>
    )
}