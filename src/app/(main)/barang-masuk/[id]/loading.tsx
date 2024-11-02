import DetailLoading from "@/components/DetailLoading";
import Main, { MainBody, MainHeader } from "@/layout/Main";

export default function Loading() {

    return (
        <Main>
            <MainHeader>
                <p>Detail Barang Masuk</p>
            </MainHeader>
            <MainBody>
                <DetailLoading />
            </MainBody>
        </Main>
    )
}