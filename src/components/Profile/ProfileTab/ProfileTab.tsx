import React from 'react'
import "./ProfileTab.css"

function ProfileTab() {
  return (
    <div className='ProfileTab'>
        <div className='ProfileTabButton ProfileTabButtonSelected'>
            <span className='ProfileTabButtonText'>勉強記録</span>
        </div>
        <div className='ProfileTabButton ProfileTabButtonNone'>
            <span className='ProfileTabButtonText'>グラフ</span>
        </div>
    </div>
  )
}

export default ProfileTab