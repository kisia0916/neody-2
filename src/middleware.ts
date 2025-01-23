import { auth } from "$/auth"
import { NextRequest, NextResponse } from "next/server"



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
            }
            //resからアカウントが存在しているか確認し、しない場合はsignupにリダイレクト
            
        }else{
            url.pathname = "/error"
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