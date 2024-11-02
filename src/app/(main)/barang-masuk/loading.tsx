import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";



export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Barang Masuk</p>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Nama Barang', 'Supplier', 'Jumlah', 'Tanggal']}
                />
            </MainBody>
        </Main>
    )
}