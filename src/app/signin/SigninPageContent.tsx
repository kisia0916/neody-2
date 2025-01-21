import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { api_user_account_response } from '../api/user/account/route'
import { useRouter } from 'next/navigation'

function SigninPageContent() {
    const {data:session,status} = useSession()
    const router = useRouter()
    useEffect(()=>{
        const fetch_data = async()=>{
          const response = await fetch("/api/user/account",{
              method:"get",
          })
          if (!response.ok){
            console.log("error")
          }else{
            const data:api_user_account_response = await response.json()
            if (data.account_status === "signin"){
              router.push("/")
            }else{
              //apiでsessionを取得して認証に使用
              router.push("/signup")
            }
          }
        }
        if (status === "authenticated"){
          fetch_data()
        }
    },[status])
  return (
    <div>
        <button onClick={()=>signIn("google")}>signin</button>
    </div>
  )
}

export default SigninPageContent