import Main, { MainBody, MainHeader } from "@/layout/Main";
import ProfileForm from "./ProfileForm";

export default async function Profil() {

    return (
        <Main>
            <MainHeader>
                <p>Profil Pengguna</p>
            </MainHeader>
            <MainBody>
                <ProfileForm />
            </MainBody>
        </Main>
    )
}