"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function TimerContent() {
  const session = useSession()
  useEffect(()=>{
    console.log(session)
  },[session])
  return (
    <div>TimerContent</div>
  )
}

export default TimerContent