import Main, { MainBody, MainHeader } from "@/layout/Main";
import Table from "@/components/Table";
import getJenis from "@/lib/getJenis";
import AddJenisButton from "@/components/AddJenisButton";
import deleteJenis from "@/server/deleteJenis";
import { delay } from "@/lib/delay";

export default async function JenisBarang({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {
    await delay(1000)
    const filter_by = searchParams?.filter_by
    const filter_key = searchParams?.filter_key
    const jenis = await getJenis(filter_by, filter_key)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Jenis Barang</p>
                <AddJenisButton />
            </MainHeader>
            <MainBody>
                <Table
                    data={jenis}
                    cols={['Jenis']}
                    identifier="name"
                    name="Jenis Barang"
                    detailPath="/jenis-barang"
                    filterBy={[{ key: 'name', label: 'Jenis', checked: true }]}
                    deleteAction={deleteJenis}
                />
            </MainBody>
        </Main>
    )
}