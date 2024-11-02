import Input from "@/components/Input"
import PageHierarchy from "@/components/PageHierarchy"
import prisma from "@/lib/db"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import UpdateForm from "./UpdateForm";

interface Props {
    params: {
        id: string
    }
}

export default async function UserDetailPage({ params }: Props) {
    const user = await prisma.user.findUnique({
        where: { id: params.id }
    })

    await new Promise(r => setTimeout(r, 2000))

    if (!user) return (
        <main>
            <p>User not found</p>
        </main>
    )

    return (
        <div className="shadow rounded-md flex flex-col">
            <div className="bg-base-300 p-4 flex justify-between items-center">
                <p>Detail Pengguna</p>
            </div>
            <div className="bg-base-100 p-4 max-h-full" >
                <UpdateForm user={user} />
            </div>
        </div>
    )
}