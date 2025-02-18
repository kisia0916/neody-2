import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { boolean } from 'zod'
import AuthSession from './AuthSession'

function page() {
    return (
        <SessionProvider>
            <AuthSession/>
        </SessionProvider>
    )
}

export default page