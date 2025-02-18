"use client"
import React, { useEffect, useRef, useState } from 'react'
import { new_user_type } from '../api/user/account/route'
import { useRouter } from 'next/navigation'
import "./SignupPage.css"
import { signIn, signOut, useSession } from 'next-auth/react'
import { z } from 'zod'

function SignupContent() {
    const user_id_ref = useRef<HTMLInputElement>(null)
    const user_name_ref = useRef<HTMLInputElement>(null)
    const first_render = useRef<boolean>(true)
    const {data:session,status} = useSession()

    const user_id_schema = z.string().min(4,{message:"ユーザーIDは4文字以上で設定してください"}).max(20,{message:"ユーザーIDは20文字以下で設定してください"})
    const user_name_schema = z.string().min(4,{message:"表示名は4文字以上で設定してください"}).max(20,{message:"表示名は20文字以下で設定してください"})
    const [user_name_error,set_user_name_error] = useState<string>("")
    const [user_id_error,set_user_id_error] = useState<string>("")
    const [session_error,set_session_error] = useState<string>("")

    const [default_google_account_info,set_default_google_account_info] = useState<{icon:string,mail:string}>({
        icon:"/Icons/user_4_fill (1).svg",
        mail:"Googleアカウントを選択"
    })
    const router = useRouter()
    const click_function = async()=>{
        const user_id = user_id_ref.current?.value
        const user_name = user_name_ref.current?.value
        const user_id_result = user_id_schema.safeParse(user_id)
        const user_name_result = user_name_schema.safeParse(user_name)
        let res_json:{data:string} = {data:""}
        if (user_name && user_id){
            if (user_id_result.success && user_name_result.success && session){ 
                set_user_id_error("")
                set_user_name_error("")
                const body_data:new_user_type = {
                    display_name:user_name,
                    user_id:user_id,
                }
                const res = await fetch("/api/user/account",{
                    method:"post",
                    body:JSON.stringify(body_data)
                })
                res_json = await res.json()
                if (!res.ok){
                    router.push("/error")
                }else{
                    router.push("/")
                }
            }
        }
        if (!user_id_result.success){
            const error = user_id_result.error.format()
            set_user_id_error(error._errors[0])
        }else if (res_json.data === "account_api_error_002"){
            set_user_id_error("このユーザーIDは既に使用されています")
        }else{
            set_user_id_error("")
        }
        if (!user_name_result.success){
            const error = user_name_result.error.format()
            set_user_name_error(error._errors[0])
        }else{
            set_user_name_error("")
        }
        if (!session){
            set_session_error("アカウントを選択してください")
        }else if (res_json.data === "account_api_error_001"){
            set_session_error("このアカウントは既に使用されています")
        }else{
            set_session_error("")
        }
    }
    useEffect(()=>{
        if (first_render.current){
            if (status !== "loading"){
                first_render.current = false
                if (session){
                    console.log(session)
                    set_default_google_account_info({
                        icon:session.user?.image as string,
                        mail:session.user?.email as string
                    })
                }
            }
        }
    },[default_google_account_info,session,status])
  return (
    <div className='SignupPageMain'>

        <div className='SignupBox'>
            <div className='SignupBoxTop'>
                <span className='SignupTitle'>アカウントを作成</span>
            </div>
            <div className='SignupBoxMiddle'>
                <div className='SignupSettingAccount'>
                    <div className='SignupSettingAccountWrapper'>
                        <button className='SignupSettingAccountContent' onClick={()=>{
                            if (session){
                                signOut()
                            }
                            signIn("google")
                        }}>
                            <img src={default_google_account_info.icon} className='SignupSettingAccountContentIcon'/>
                            <span className='SignupSettingAccountText'>{default_google_account_info.mail}</span>
                        </button>
                        <p className='SignupErrorMessage'>{session_error}</p>
                    </div>
                </div>
                <div className='SignupElement'>
                    <p className='SignupElementTitle'>ユーザーID</p>
                    <div className='SignupElementInputWrapper'>
                        <span className='SignupElementIDMark'>@</span>
                        <input type='text' className='SignupElementInput' placeholder='example1234' ref={user_id_ref}/>
                    </div>
                    <p className='SignupErrorMessage'>{user_id_error}</p>
                </div>  
                <div className='SignupElement'>
                    <p className='SignupElementTitle'>表示名</p>
                    <div className='SignupElementInputWrapper'>
                        <input type='text' className='SignupElementInput' placeholder='neko0123' ref={user_name_ref}/>
                    </div>
                    <p className='SignupErrorMessage'>{user_name_error}</p>
                </div> 
            </div>
            <div className='SignupBoxBottom'>
                <button onClick={click_function} className='SignupCreateAccountButton'>アカウント作成</button>
            </div>
            <div>
            </div>
        </div>
    </div>
  )
}

export default SignupContent