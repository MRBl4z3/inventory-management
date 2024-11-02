import Main, { MainBody, MainHeader } from "@/layout/Main";
import UpdatePasswordForm from "./UpdatePasswordForm";
import getUserById from "@/lib/getUserById";
import { getAuthServerSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";


export default async function GantiPassword() {
    const session = await getAuthServerSession()
    if (!session) return redirect('/signin')

    const user = await getUserById(session.user.id)
    if (!user) return redirect('/signin')

    return (
        <Main>
            <MainHeader>
                <p>Ganti Password</p>
            </MainHeader>
            <MainBody>
                <UpdatePasswordForm />
            </MainBody>
        </Main>
    )
}