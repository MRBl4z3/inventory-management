import { Fragment, ReactNode } from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Link from "next/link";
import { getAuthServerSession } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";
import PersonIcon from '@mui/icons-material/Person';

interface Props {
  href: string
  title: string
  icon: ReactNode
}

function DashboardLink({ href, icon, title }: Props) {
  return (
    <Link href={href} className="shadow bg-base-100 btn  text-sm">
      {icon}
      <p>{title}</p>
    </Link>
  )
}

export default async function Home({ }) {
  const session = await getAuthServerSession()
  if (!session) return redirect('/signin')

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  return (
    <main>
      <p>Selamat datang di dashboard</p>
      <div className="flex flex-wrap mt-4 gap-4">
        <DashboardLink
          href="/"
          icon={<HomeOutlinedIcon className="fill-base-content" />}
          title="Dashboard"
        />
        {
          user?.role === UserRole.SuperAdmin &&
          <DashboardLink
            href="/data-pengguna"
            icon={<PeopleOutlinedIcon className="fill-base-content" />}
            title="Data Pengguna"
          />
        }
        {
          (user?.role === UserRole.SuperAdmin || user?.role === UserRole.Admin) &&
          <Fragment>
            <DashboardLink
              href="/data-barang"
              icon={<Inventory2OutlinedIcon className="fill-base-content" />}
              title="Data Barang"
            />
            <DashboardLink
              href="/jenis-barang"
              icon={<CategoryOutlinedIcon className="fill-base-content" />}
              title="Jenis Barang"
            />
            <DashboardLink
              href="/satuan-barang"
              icon={<FormatSizeOutlinedIcon className="fill-base-content" />}
              title="Satuan Barang"
            />
            <DashboardLink
              href="/data-pembeli"
              icon={<PortraitOutlinedIcon className="fill-base-content" />}
              title="Data Pembeli"
            />
            <DashboardLink
              href="/data-supplier"
              icon={<PortraitOutlinedIcon className="fill-base-content" />}
              title="Data Supplier"
            />
          </Fragment>
        }
        <DashboardLink
          href="/barang-masuk"
          icon={<AddShoppingCartOutlinedIcon className="fill-base-content" />}
          title="Barang Masuk"
        />
        <DashboardLink
          href="/barang-keluar"
          icon={<ShoppingCartCheckoutOutlinedIcon className="fill-base-content" />}
          title="Barang Keluar"
        />
        <DashboardLink
          href="/profil"
          icon={<PersonIcon className="fill-base-content" />}
          title="Profil"
        />
      </div>
    </main>
  );
}
