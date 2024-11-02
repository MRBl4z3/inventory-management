
import AddUserButton from "@/components/AddUserButton"
import Table from "@/components/Table"
import Main, { MainBody, MainHeader } from "@/layout/Main"
import getUser from "@/lib/getUsers"
import deleteUser from "@/server/deleteUser"

export default async function DataPengguna({ searchParams }: {
    searchParams?: {
        filter_by?: string,
        filter_key?: string
    }
}) {

    await new Promise(r => setTimeout(r, 2000))

    const filterBy = searchParams?.filter_by
    const filterKey = searchParams?.filter_key

    const users = await getUser(filterBy, filterKey)

    return (
        <Main>
            <MainHeader>
                <p>Tabel Data Pengguna</p>
                <AddUserButton />
            </MainHeader>
            <MainBody>
                <Table
                    data={users}
                    name="Pengguna"
                    cols={['NIK', 'Nama', 'Telepon', 'Username', 'Role', 'Password']}
                    detailPath="/data-pengguna"
                    filterBy={[
                        { key: 'nik', label: 'NIK' },
                        { key: 'name', label: 'Nama', checked: true },
                        { key: 'phone', label: 'Telepon' },
                        { key: 'username', label: 'Username' }
                    ]}
                    identifier="name"
                    deleteAction={deleteUser}
                />
            </MainBody>
        </Main>
    )
}