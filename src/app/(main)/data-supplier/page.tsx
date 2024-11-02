import Table from "@/components/Table";
import getSuppliers from "@/lib/getSuppliers";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import AddSupplierButton from "@/components/AddSupplierButton";
import deleteSupplier from "@/server/deleteSupplier";
import { delay } from "@/lib/delay";

export default async function DataSupplier({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {

    const filterBy = searchParams?.filter_by
    const filterKey = searchParams?.filter_key
    const suppliers = await getSuppliers(filterBy, filterKey)
    await delay(1000)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Data Supplier</p>
                <AddSupplierButton />
            </MainHeader>
            <MainBody>
                <Table
                    name="Supplier"
                    data={suppliers}
                    identifier="name"
                    detailPath="/data-supplier"
                    cols={['Kode', 'Nama', 'Alamat', 'Telepon']}
                    filterBy={[
                        { key: 'code', label: 'Kode' },
                        { key: 'name', label: 'Nama', checked: true },
                        { key: 'address', label: 'Alamat' },
                        { key: 'phone', label: 'Telepon' },
                    ]}
                    deleteAction={deleteSupplier}
                />
            </MainBody>
        </Main>
    )
}