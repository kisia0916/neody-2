import { auth } from "$/auth"
import { NextRequest, NextResponse } from "next/server"
import { api_user_middleware_response } from "./app/api/middlewear/route"
import { getToken } from "next-auth/jwt"



export async function middleware(request:NextRequest){
    const token = await getToken({req:request,secret:process.env.AUTH_SECRET})
    const url = request.nextUrl.clone()
    try{
        if (token){
            return NextResponse.next()
        }else{
            // return NextResponse.next()

            url.pathname = "/signin"
            return NextResponse.redirect(url)
        }
    }catch{
        url.pathname = "/error"
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher:["/","/profile/:path*","/friend","/ranking","/team"]
}