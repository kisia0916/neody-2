"use client"
import React from 'react'
import "./SignupPage.css"
import { SessionProvider } from 'next-auth/react'
import SignupContent from './SignupContent'

function page() {
  return (
    <SessionProvider>
        <SignupContent/>
    </SessionProvider>
  )
}

export default page