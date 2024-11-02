"use client"

import Link from "next/link";
import { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import PersonIcon from '@mui/icons-material/Person';

export default function PageHierarchy() {
    const router = useRouter()
    const pathname = usePathname()
    const hierarcy = useMemo(() => {
        if (pathname === '/') return [{ label: 'Dashboard', path: '/', Icon: HomeOutlinedIcon }]
        const paths = pathname.split('/')
        return paths.map((path, i) => {
            if (i === 2)
                return { label: 'Detail', path: '/' + path, Icon: FolderOutlinedIcon }

            switch (path) {
                case 'data-pengguna':
                    return { label: 'Data Pengguna', path: '/' + path, Icon: PeopleOutlinedIcon }
                case 'data-barang':
                    return { label: 'Data Barang', path: '/' + path, Icon: Inventory2OutlinedIcon }
                case 'jenis-barang':
                    return { label: 'Jenis Barang', path: '/' + path, Icon: CategoryOutlinedIcon }
                case 'satuan-barang':
                    return { label: 'Satuan Barang', path: '/' + path, Icon: FormatSizeOutlinedIcon }
                case 'data-supplier':
                    return { label: 'Data Supplier', path: '/' + path, Icon: PortraitOutlinedIcon }
                case 'data-pembeli':
                    return { label: 'Data Pembeli', path: '/' + path, Icon: PortraitOutlinedIcon }
                case 'barang-masuk':
                    return { label: 'Barang Masuk', path: '/' + path, Icon: AddShoppingCartOutlinedIcon }
                case 'barang-keluar':
                    return { label: 'Barang Keluar', path: '/' + path, Icon: ShoppingCartCheckoutOutlinedIcon }
                case 'profil':
                    return { label: 'Profil', path: '/' + path, Icon: PersonIcon }
                default:
                    return { label: 'Dashboard', path: '/' + path, Icon: HomeOutlinedIcon }
            }

        })
    }, [pathname])

    const redirectToPreviousPage = () => {
        router.back()
    }

    return (
        <div className="flex">
            <button onClick={redirectToPreviousPage} className="btn-link text-sm">Kembali</button>
            <div className="divider divider-horizontal"></div>
            <div className="breadcrumbs">
                <ul>
                    {hierarcy.map(({ path, Icon, label }) => {
                        return <li key={label}>
                            <Link href={path} className="text-sm">
                                <Icon className="mr-4" />
                                {label}
                            </Link>
                        </li>
                    })}
                </ul>

            </div>
        </div>
    )
}