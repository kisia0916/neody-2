"use client"
import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'
import TimerContent from './TimerContent'

function page() {

  return (
    <SessionProvider>
      <TimerContent/>
    </SessionProvider>
  )
}

export default page 