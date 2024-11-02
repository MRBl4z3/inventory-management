import { signIn } from "next-auth/react"
import SignInForm from "./SignInForm"
import { getAuthServerSession } from "../api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"

export default async function Signin() {
    const session = await getAuthServerSession()
    if (session) {
        return redirect('/')
    }

    return (
        <main className="h-screen flex items-center justify-center bg-base-200">
            <div className="card bg-base-100">
                <div className="card-body">
                    <span className="card-title self-center">Inventaris</span>
                    <SignInForm />
                </div>
            </div>
        </main>
    )
}