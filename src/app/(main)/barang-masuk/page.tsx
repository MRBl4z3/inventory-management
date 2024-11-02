import AddBarangMasukButton from "@/components/AddBarangMasukButton";
import Table from "@/components/Table";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import prisma from "@/lib/db";
import { delay } from "@/lib/delay";
import getBarang from "@/lib/getBarang";
import getBarangMasuk from "@/lib/getBarangMasuk";
import getSuppliers from "@/lib/getSuppliers";
import deleteBarangMasuk from "@/server/deleteBarangMasuk";



export default async function BarangMasuk({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {

    const filterBy = searchParams?.filter_by
    const filterKey = searchParams?.filter_key

    const barang = await getBarang()
    const suppliers = await getSuppliers()
    const barangMasuk = await getBarangMasuk(filterBy, filterKey)
    await delay(1000)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Barang Masuk</p>
                <AddBarangMasukButton barang={barang} suppliers={suppliers} />
            </MainHeader>
            <MainBody>
                <Table
                    data={barangMasuk}
                    cols={['Nama Barang', 'Supplier', 'Jumlah', 'Tanggal']}
                    deleteAction={deleteBarangMasuk}
                    detailPath="/barang-masuk"
                    filterBy={[
                        { key: 'barang', label: 'Barang', checked: true },
                        { key: 'supplier', label: 'Supplier' },
                    ]}
                    identifier="id"
                    name="Barang Masuk"
                />
            </MainBody>
        </Main>
    )
}