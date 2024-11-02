import TableSkeleton from "@/components/TableSkeleton";
import Main, { MainBody, MainHeader } from "@/layout/Main";

export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Tabel Data Pengguna</p>
                <button className="btn btn-sm btn-success">Tambah</button>
            </MainHeader>
            <MainBody>
                <TableSkeleton cols={['NIK', 'Nama', 'Telepon', 'Username', 'Role', 'Password']} />
            </MainBody>
        </Main>
    )
}