import AddUnitButton from "@/components/AddUnitButton";
import Table from "@/components/Table";
import Main, { MainBody, MainHeader } from "@/layout/Main";
import getUnits from "@/lib/getUnits";
import deleteUnit from "../../../server/deleteUnit";
import { delay } from "@/lib/delay";

export default async function SatuanBarang({ searchParams }: {
    searchParams?: {
        filter_by?: string
        filter_key?: string
    }
}) {
    await delay(1000)
    const filterBy = searchParams?.filter_by
    const filterKey = searchParams?.filter_key
    const units = await getUnits(filterBy, filterKey)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Satuan Barang</p>
                <AddUnitButton />
            </MainHeader>
            <MainBody>
                <Table
                    data={units}
                    name="Satuan Barang"
                    cols={['Nama']}
                    detailPath="/satuan-barang"
                    filterBy={[{ key: 'name', label: 'Nama', checked: true }]}
                    identifier="name"
                    deleteAction={deleteUnit}
                />
            </MainBody>
        </Main>
    )
}