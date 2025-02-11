"use client"
import React, { useEffect, useState } from 'react'
import "./NavigationBar.css"
import { usePathname, useRouter } from 'next/navigation'


const ignore_path:string[] = ["signin","signup","error"]
function NavigationBar() {
  const router = useRouter()
  const path_name = usePathname()
  const [is_display,set_is_display] = useState(false)
  const navigatePage = (path:string)=>{
    router.push(path)
  }
  useEffect(()=>{
    if (ignore_path.findIndex((e)=>e === path_name.split("/")[1]) === -1){
      set_is_display(true)
    }
  },[path_name,is_display])
  if (is_display){
    return (
      <div className='NavigationBarMain'>
          <button className='NavigationBarButton' onClick={()=>navigatePage("/")}>
              <img src="/Icons/home_5_fill (2).svg" className='NavigationBarIcon'/>
          </button>
          <button className='NavigationBarButton'>
              <img src="/Icons/VIP_2_line.svg" className='NavigationBarIcon'/>
          </button>
          <button className='NavigationBarButton'>
              <img src="/Icons/emoji_line.svg" className='NavigationBarIcon'/>
          </button>
          <button className='NavigationBarButton' onClick={()=>navigatePage("/profile/fumi0916")}>
              <img src="/Icons/user_2_line.svg" className='NavigationBarIcon'/>
          </button>
        </div>
    )
  }else{
    return <></>
  }
}

export default NavigationBar