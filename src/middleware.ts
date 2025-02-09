import { auth } from "$/auth"
import { NextRequest, NextResponse } from "next/server"
import { api_user_middleware_response } from "./app/api/middlewear/route"



export async function middleware(request:NextRequest){
    const session = await auth()
    const url = request.nextUrl.clone()
    // //アカウントの有無を確認
    try{
        if (session){
            const response = await fetch("http://localhost:3000/api/middlewear",{
                method:"get",
                cache:"no-cache"
            })
            if (!response.ok){
                url.pathname = "/error"
                return NextResponse.redirect(url)
            }else{
                const data:api_user_middleware_response = await response.json()
                if (data.data === "signin"){
                    return NextResponse.next()
                }else if (data.data === "signup"){
                    url.pathname = "/signup"
                    return NextResponse.redirect(url)
                }else if (data.data === "no_session"){
                    url.pathname = "/signin"
                    return NextResponse.redirect(url)
                }
            }
            //resからアカウントが存在しているか確認し、しない場合はsignupにリダイレクト
        }else{
            url.pathname = "/signin"
            return NextResponse.redirect(url)
        }
    }catch(error){
        url.pathname = "/error"
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher:["/","/profile/:path*","/friend","/ranking","/team"]
}