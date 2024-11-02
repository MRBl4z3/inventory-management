import { UserRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log('hi');

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.redirect(new URL('/signin', request.url))

    if (request.nextUrl.pathname !== '/') {
        switch (token.role) {
            case UserRole.Admin:
                if (!request.nextUrl.pathname.startsWith('/data-pengguna')) {
                    return NextResponse.next()
                } else {
                    return NextResponse.redirect(new URL('/', request.url))
                }
            case UserRole.Petugas:
                if (!request.nextUrl.pathname.startsWith('/barang-masuk') ||
                    !request.nextUrl.pathname.startsWith('/barang-keluar')) {
                    return NextResponse.next()
                } else {
                    return NextResponse.redirect(new URL('/', request.url))
                }
        }
    }

    console.log('b');


}

export const config: MiddlewareConfig = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|signin).*)']
}