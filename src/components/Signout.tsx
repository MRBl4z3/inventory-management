'use client'

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { signOut } from 'next-auth/react';

export default function Signout() {
    const onClick = () => {
        signOut()
    }

    return (
        <div onClick={onClick}>
            <ExitToAppOutlinedIcon className="fill-base-content" />
            Keluar
        </div>
    )
}