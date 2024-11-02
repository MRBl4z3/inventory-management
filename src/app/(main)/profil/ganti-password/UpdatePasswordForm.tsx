"use client"

import Input, { useInput } from "@/components/Input"
import userContext from "@/context/userContext"
import handleAction from "@/lib/handleAction"
import updatePassword from "@/server/updatePassword"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"

export default function UpdatePasswordForm() {
    const user = useContext(userContext)
    const [isMatched, setIsMatched] = useState(false)
    const [newPassword, onNewPasswordChange] = useInput('')
    const [passwordConfirmation, onPasswordConfirmationChange] = useInput('')

    const handleChangePassword = useCallback(async (data: FormData) => {
        const isSuccess = await handleAction({
            data,
            action: updatePassword,
            success: 'Berhasil Mengganti Password',
            error: 'Gagal Mengganti Password'
        })

        if (isSuccess) return redirect('/profil')
    }, [])

    useEffect(() => {
        if (!!newPassword && !!passwordConfirmation && newPassword === passwordConfirmation) {
            setIsMatched(true)
        } else {
            setIsMatched(false)
        }
    }, [newPassword, passwordConfirmation])

    return (
        <form action={handleChangePassword} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
                <input name="id" type="text" defaultValue={user.id} className="hidden" />
                <Input
                    name="old-password"
                    type="password"
                    label="Password Sebelumnya"
                    placeholder="password"
                />
                <Input
                    name="new-password"
                    type="password"
                    label="Password Baru"
                    placeholder="password"
                    value={newPassword}
                    onChange={onNewPasswordChange}
                />
                <Input
                    type="password"
                    label="Konfirmasi Password"
                    placeholder="password"
                    value={passwordConfirmation}
                    onChange={onPasswordConfirmationChange}
                />
            </div>
            <button className="self-end btn btn-success" disabled={!isMatched}>Konfirmasi</button>
        </form>
    )
}