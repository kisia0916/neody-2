"use client"
import { SessionProvider} from 'next-auth/react'
import React from 'react'
import SigninPageContent from './SigninPageContent'

function page() {
  return (
    <SessionProvider>
        <SigninPageContent/>
    </SessionProvider>
  )
}

export default page