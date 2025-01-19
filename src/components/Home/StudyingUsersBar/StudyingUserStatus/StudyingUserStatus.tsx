import React from 'react'
import "./StudyingUserStatus.css"
import StudyingUserMess from './StudyingUserMess/StudyingUserMess'

function StudyingUserStatus() {
  return (
    <div className='StudyingUserStatusWarp'>
        <StudyingUserMess/>
        <div className='StudyingUserStatusMessBottom'></div>
        <div className='StudyingUserStatus'>
            <div className='StudyingUserLeft'>
                <img src='/user/icon/fumi.jpg' className='StudyingUserIcon'/>
            </div>
            <div className='StudyingUserRight'>
                <p className='StudyingUserName'>fumi0916</p>
                <p className='StudyingTime'>10:00</p>
            </div>
        </div>
    </div>
  )
}

export default StudyingUserStatus