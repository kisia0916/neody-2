import React from 'react'
import "./ProfileTopBar.css"
import UserInfo from '../UserInfo/UserInfo'

function ProfileTopBar() {
  return (
    <div className='ProfileTopBar'>
        <div className='ProfileTopBarContent ProfileTopBarLeft'>
            <button className='ProfileTopBarButton'>
                <img src='/Icons/left_fill (1).svg'/>
            </button>
        </div>
        <div className='ProfileTopBarContent ProfileTopBarCenter'>
            <span className='ProfileTopBarTitle'>プロフィール</span>
        </div>
        <div className='ProfileTopBarContent ProfileTopBarRight'>
            <UserInfo/>
        </div>
    </div>
  )
}

export default ProfileTopBar