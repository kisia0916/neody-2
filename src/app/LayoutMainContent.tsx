"use client"
import NavigationBar from '@/components/common/NavigationBar/NavigationBar'
import StartStudyButton from '@/components/common/StartStudyButton/StartStudyButton'
import TopBar from '@/components/common/TopBar/TopBar'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { api_user_account_response } from './api/user/account/route'

const ignore_auth = ["/signin","/signup"]
function LayoutMainContent(props:any) {
    const first_flg = useRef<boolean>(true)
    const [load_done,set_load_done] = useState<boolean>(false)
    const router = useRouter()
    const pathName = usePathname()
    useEffect(()=>{
        const get_app_data = async()=>{
            const res = await fetch("/api/user/account",{
                cache:"no-cache"
            })
            if (!res){
                router.push("/error")
            }
            const data:api_user_account_response = await res.json()
            if (data.account_status === "signup"){
                router.push("/signin")
            }else{
                set_load_done(true)
            }
        }
        if (ignore_auth.findIndex((i:string)=>i === pathName) === -1){
            if (first_flg.current){
                first_flg.current = false 
                get_app_data()
            }
        }else{
            set_load_done(true)
        }
    },[first_flg,load_done,pathName])

  return (
    <>
    {load_done?
        <>
        <TopBar/>
        <div className="MainScreen">
            {props.child}
        </div>
        <StartStudyButton/>
        <NavigationBar/>
        </>:<>loading...</>}
    </>
  )
}

export default LayoutMainContent