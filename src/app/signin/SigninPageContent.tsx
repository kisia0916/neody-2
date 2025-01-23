import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { api_user_account_response } from '../api/user/account/route'
import { useRouter } from 'next/navigation'

function SigninPageContent() {
    const {data:session,status} = useSession()
    const router = useRouter()
    const [user_check_status,set_user_check_status] = useState<boolean>(false)
    const first_flg = useRef<boolean>(true)
    useEffect(()=>{
        const fetch_data = async()=>{
          const response = await fetch("/api/user/account",{
              method:"get",
              cache:"no-store"
          })
          if (response.ok){
            const data:api_user_account_response = await response.json()
            if (data.account_status === "signin"){
              router.push("/")
            }else if (data.account_status === "signup"){
              //apiでsessionを取得して認証に使用
              router.push("/signup")
            }else{
              set_user_check_status(true)
            }
          }else{
            router.push("/error")
          }
        }
        if (first_flg.current){
          first_flg.current = false
          fetch_data()
        }
    },[user_check_status])
  return (
    <div>
        {user_check_status?          
          <button onClick={()=>{
            signIn("google")
          }}>signin</button>:
          <span>now loading...</span>
          }

    </div>
  )
}

export default SigninPageContent