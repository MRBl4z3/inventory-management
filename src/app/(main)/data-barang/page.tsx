import AddBarangButton from "@/components/AddBarangButton";
import Table from "@/components/Table";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import getBarang, { FilterBy } from "@/lib/getBarang";
import getJenis from "@/lib/getJenis";
import getUnits from "@/lib/getUnits";
import deleteBarang from "@/server/deleteBarang";

export default async function DataBarang({ searchParams }: {
    searchParams?: {
        filter_by?: FilterBy
        filter_key?: FilterBy
    }
}) {

    const filterBy = searchParams?.filter_by
    const filterKey = searchParams?.filter_key

    const barang = await getBarang(filterBy, filterKey)
    const jenis = await getJenis()
    const unit = await getUnits()

    return (
        <Main>
            <MainHeader>
                <p>Tabel Data Barang</p>
                <AddBarangButton jenis={jenis} unit={unit} />
            </MainHeader>
            <MainBody>
                <Table
                    data={barang}
                    cols={['Kode', 'Nama', 'Jumlah', 'Jenis', 'Satuan']}
                    deleteAction={deleteBarang}
                    detailPath="/data-barang"
                    identifier="name"
                    name="Barang"
                    filterBy={[
                        { key: 'code', label: 'Kode' },
                        { key: 'name', label: 'Nama', checked: true },
                        { key: 'jenis', label: 'Jenis' },
                        { key: 'unit', label: 'Satuan' },
                    ]}
                />
            </MainBody>
        </Main>
    )
}