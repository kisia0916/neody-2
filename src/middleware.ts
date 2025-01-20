import { auth } from "$/auth"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request:NextRequest){
    const session = await auth()
    console.log(session)
    if (!session){
        const url = request.nextUrl.clone()
        url.pathname = "/signin"
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher:["/","/profile/:path*","/friend","/ranking","/team"]
}