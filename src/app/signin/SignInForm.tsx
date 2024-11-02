'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"


export default function SignInForm() {
    const [isLoginError, setIsLoginError] = useState(false)
    const router = useRouter()

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.username as HTMLInputElement).value
        const password = (e.currentTarget.password as HTMLInputElement).value

        const response = await signIn('credentials', {
            redirect: false,
            username,
            password,
        })

        if (response) {
            if (response.ok) {
                setIsLoginError(false)
                router.refresh()
            } else {
                setIsLoginError(true)
            }
        }

    }

    return (
        <form className="form-control" onSubmit={handleSignIn}>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Username</span>
                </div>
                <input className="input input-bordered" type="text" placeholder="username" name="username" />
            </label>
            <label className="form-control mb-4">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input className="input input-bordered" type="password" placeholder="password" name="password" />
            </label>
            <button className="btn btn-primary">Masuk</button>
            {
                isLoginError && <span className="text-center text-error text-sm mt-4">username atau password salah</span>
            }
        </form>
    )
}