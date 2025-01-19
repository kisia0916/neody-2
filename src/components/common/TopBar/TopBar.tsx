"use client"
import React from 'react'
import "./TopBar.css"
import { usePathname } from 'next/navigation'
import HomeHomeTopBar from './HomeTopBar/HomeTopBar'
import ProfileTopBar from './ProfileTopBar/ProfileTopBar'

function TopBar(){
  const path = usePathname()
  return (
    <>
    {path.split("/")[1] === ""&&<HomeHomeTopBar/>}
    {path.split("/")[1] === "profile"&&<ProfileTopBar/>}
    </>
  )
}

export default TopBar