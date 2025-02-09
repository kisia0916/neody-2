import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { api_user_account_response } from '../api/user/account/route'
import { useRouter } from 'next/navigation'

function SigninPageContent() {
    const router = useRouter()
    const [user_check_status,set_user_check_status] = useState<boolean>(false)
    const {data:session,status} = useSession()
    const first_flg = useRef<boolean>(true)
    useEffect(()=>{
      const user_auth = async()=>{
        const response = await fetch("/api/user/account",{
          cache:"no-store"
        })
        const data:api_user_account_response = await response.json()
        if (data.account_status === "signin"){
          router.push("/")
        }else{
          set_user_check_status(true)
        }
      }
      if (status === "authenticated"){
        if (first_flg.current){
          first_flg.current = false
          user_auth()
        }
      }else if (status !== "loading"){
        set_user_check_status(true)
      }
    },[first_flg,status])
  return (
    <div>
          {user_check_status?
            <>
              <button onClick={()=>{signIn("google")}}>signin</button><br/>
              <button onClick={()=>{
                router.push("/signup")
              }}>signup</button>
            </>
          :<span>loading.....</span>}
    </div>
  )
}

export default SigninPageContent