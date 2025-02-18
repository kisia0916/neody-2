"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import "./SigninPage.css"
import { signIn } from 'next-auth/react'

function page() {
    const router = useRouter()
  return (
    <div className='SigninPageMain'>
      <div className='SigninBox'>
        <div className='SigninBoxTop'>
          <p className='SigninTitle'>Timeorb</p>  
        </div>
        <div className='SigninBoxMiddle'>
          <div className='SigninMiddleContent'>
              <button className='SigninButton' onClick={()=>signIn('google',{callbackUrl:'/signin/auth'})}>
                <div className='SigninButtonContent'>
                  <img src='/Icons/google_fill.svg' className='SigninIcon'/>
                  <span className='SigninButtonContentText'>googleでサインイン</span>
                </div>
              </button>
              <div className='SigninBoxSplitLine'>
                <div className='SigninBoxSplitLineLeft'></div>
                <span className='SigninBoxSplitText'>またはアカウント作成</span>
                <div className='SigninBoxSplitLineRight'></div>
              </div>
              <button className='SigninButton' >
                <div className='SigninButtonContent' onClick={()=>router.push('/signup')}>
                  <img src='/Icons/google_fill (1).svg' className='SigninIcon'/>
                  <span className='SigninButtonContentText'>googleでサインアップ</span>
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page