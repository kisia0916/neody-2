"use client"
import React from 'react'
import "./NavigationBar.css"
import { useRouter } from 'next/navigation'

function NavigationBar() {
  const router = useRouter()
  const navigatePage = (path:string)=>{
    router.push(path)
}
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
}

export default NavigationBar