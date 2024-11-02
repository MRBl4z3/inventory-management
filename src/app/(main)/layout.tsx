import Link from "next/link";
import Signout from "@/components/Signout";
import { ReactNode } from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import PageHierarchy from "@/components/PageHierarchy";
import MenuIcon from '@mui/icons-material/Menu';
import AdminOnly from "@/components/AdminOnly";
import SuperAdminOnly from "@/components/SuperAdminOnly";
import PersonIcon from '@mui/icons-material/Person';
import SessionContainer from "@/components/SessionContainer";
import { getAuthServerSession } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import getUserById from "@/lib/getUserById";
import UserProvider from "@/components/UserProvider";

export default async function MainLayout({ children }: { children: ReactNode }) {
    const session = await getAuthServerSession()
    // Token is not set
    if (!session) return redirect('/signin')

    const user = await getUserById(session.user.id)
    // Token is not valid
    if (!user) return redirect('/api/auth/signout')

    return (
        <SessionContainer session={session}>
            <UserProvider value={user}>
                <div className="drawer lg:drawer-open">
                    <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className="flex flex-col h-screen overflow-auto">
                            <nav className="navbar">
                                <div className="navbar-start">
                                    <p className="text-lg font-semibold">Inventaris</p>
                                </div>
                                <div className="navbar-end lg:hidden flex gap-4">
                                    <label htmlFor="drawer-toggle" className="btn ">
                                        <MenuIcon />
                                    </label>
                                </div>
                            </nav>
                            <div className="flex-grow bg-base-200 p-4">
                                <main className="min-h-full flex flex-col gap-4">
                                    <PageHierarchy />
                                    {children}
                                </main>
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="p-4 flex flex-col h-full bg-base-300 overflow-auto">
                            <nav className="flex-grow">
                                <div className="form-control items-center">
                                    <p className="font-semibold">Navigasi</p>
                                </div>

                                <div className="divider"></div>

                                <p className="text-base-content">Menu</p>
                                <ul className="menu w-80">
                                    <li>
                                        <label htmlFor="drawer-toggle">
                                            <Link href='/'>
                                                <HomeOutlinedIcon className="fill-base-content" />
                                                Dashboard
                                            </Link>
                                        </label>
                                    </li>
                                    <SuperAdminOnly>
                                        <li><Link href='/data-pengguna'>
                                            <PeopleOutlinedIcon className="fill-base-content" />
                                            Data Pengguna
                                        </Link></li>
                                    </SuperAdminOnly>
                                </ul>
                                <AdminOnly>
                                    <p className="text-base-content">Data Master</p>
                                    <ul className="menu w-80">
                                        <li><Link href='/data-barang'>
                                            <Inventory2OutlinedIcon className="fill-base-content" />
                                            Data Barang
                                        </Link></li>
                                        <li><Link href='/jenis-barang'>
                                            <CategoryOutlinedIcon className="fill-base-content" />
                                            Jenis Barang
                                        </Link></li>
                                        <li><Link href='/satuan-barang'>
                                            <FormatSizeOutlinedIcon className="fill-base-content" />
                                            Satuan Barang
                                        </Link></li>
                                        <li><Link href='/data-pembeli'>
                                            <PortraitOutlinedIcon className="fill-base-content" />
                                            Data Pembeli
                                        </Link></li>
                                        <li><Link href='/data-supplier'>
                                            <PortraitOutlinedIcon className="fill-base-content" />
                                            Data Supplier
                                        </Link></li>
                                    </ul>
                                </AdminOnly>
                                <p className="text-base-content">Transaksi</p>
                                <ul className="menu w-80">
                                    <li><Link href='/barang-masuk'>
                                        <AddShoppingCartOutlinedIcon className="fill-base-content" />
                                        Barang Masuk
                                    </Link></li>
                                    <li><Link href='/barang-keluar'>
                                        <ShoppingCartCheckoutOutlinedIcon className="fill-base-content" />
                                        Barang Keluar
                                    </Link></li>
                                </ul>
                                <p className="text-base-content">Lainnya</p>
                                <ul className="menu w-80">
                                    <li><Link href='/profil'>
                                        <PersonIcon className="fill-base-content" />
                                        Profil
                                    </Link></li>
                                    <li><Signout /></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </UserProvider>
        </SessionContainer >
    )
}