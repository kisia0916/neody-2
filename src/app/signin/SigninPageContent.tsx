import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function SigninPageContent() {
    const {data:session,status} = useSession()
    useEffect(()=>{
        console.log(session)
    },[status])
  return (
    <div>
        <button onClick={()=>signIn("google")}>signin</button>
    </div>
  )
}

export default SigninPageContent