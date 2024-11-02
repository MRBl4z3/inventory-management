import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";



export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Table Data Barang</p>
                <button className="btn btn-success btn-sm">Tambah</button>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Kode', 'Nama', 'Jumlah', 'Jenis', 'Satuan']}
                />
            </MainBody>
        </Main>
    )
}