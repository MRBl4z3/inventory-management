import AddBarangKeluarButton from "@/components/AddBarangKeluarButton";
import Table from "@/components/Table";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import { delay } from "@/lib/delay";
import getBarang from "@/lib/getBarang";
import getBarangKeluar from "@/lib/getBarangKeluar";
import getPembeli from "@/lib/getPembeli";
import deleteBarangKeluar from "@/server/deleteBarangKeluar";

export default async function BarangKeluar({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {

    await delay(1000)
    const pembeli = await getPembeli()
    const barang = await getBarang()
    const barangKeluar = await getBarangKeluar(
        searchParams?.filter_by,
        searchParams?.filter_key
    )


    return (
        <Main>
            <MainHeader>
                <p>Tabel Barang Keluar</p>
                <AddBarangKeluarButton barang={barang} pembeli={pembeli} />
            </MainHeader>
            <MainBody>
                <Table
                    data={barangKeluar}
                    cols={['Barang', 'Pembeli', 'Jumlah', 'Tanggal']}
                    deleteAction={deleteBarangKeluar}
                    detailPath="/barang-keluar"
                    filterBy={[
                        { key: 'barang', label: 'Barang', checked: true },
                        { key: 'pembeli', label: 'Pembeli' }
                    ]}
                    identifier="id"
                    name="Barang Keluar"
                />
            </MainBody>
        </Main>
    )
}