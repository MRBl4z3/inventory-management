import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";


export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Barang Keluar</p>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Barang', 'Pembeli', 'Jumlah', 'Tanggal']}
                />
            </MainBody>
        </Main>
    )
}