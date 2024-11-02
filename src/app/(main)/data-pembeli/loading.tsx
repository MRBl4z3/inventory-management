import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";


export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Pembeli</p>
            </MainHeader>
            <MainBody>
                <TableSkeleton
                    cols={['Kode', 'Nama', 'Alamat', 'Telepon']}
                />
            </MainBody>
        </Main>
    )
}