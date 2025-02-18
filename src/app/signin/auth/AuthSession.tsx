"use client"
import { api_user_account_response } from '@/app/api/user/account/route'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

function AuthSession() {
    const {status} = useSession()
    const router = useRouter()
    useEffect(()=>{
        const auth_session = async()=>{
            const res = await fetch("/api/user/account",{
                cache:"no-cache",
            })
            if (!res.ok){
                router.push("/error")
            }else{
                const data:api_user_account_response = await res.json()
                if (data.account_status === "signin"){
                    router.push("/")
                }else if (data.account_status === "signup"){
                    router.push("/signup")
                }else{
                    router.push("/signin")
                }
            }
        }
        if (status === "authenticated"){
            auth_session()
        }else if (status === "unauthenticated"){
            router.push("/signin")
        }
    },[status])
    return (
        <span>loading...</span>
    )
}

export default AuthSession