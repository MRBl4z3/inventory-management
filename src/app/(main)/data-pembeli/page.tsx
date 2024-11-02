import AddPembeliButton from "@/components/AddPembeliButton";
import Table from "@/components/Table";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import { delay } from "@/lib/delay";
import getPembeli from "@/lib/getPembeli";
import deletePembeli from "@/server/deletePembeli";

export default async function DataPembeli({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {

    const filter_by = searchParams?.filter_by
    const filter_key = searchParams?.filter_key
    const pembeli = await getPembeli(filter_by, filter_key)
    await delay(1000)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Pembeli</p>
                <AddPembeliButton />
            </MainHeader>
            <MainBody>
                <Table
                    data={pembeli}
                    name="Data Pembeli"
                    identifier="name"
                    detailPath="/data-pembeli"
                    cols={['Kode', 'Nama', 'Alamat', 'Telepon']}
                    filterBy={[
                        { key: 'code', label: 'Kode' },
                        { key: 'name', label: 'Nama', checked: true },
                        { key: 'address', label: 'Alamat' },
                        { key: 'phone', label: 'Telepon' },
                    ]}
                    deleteAction={deletePembeli}
                />
            </MainBody>
        </Main>
    )
} 