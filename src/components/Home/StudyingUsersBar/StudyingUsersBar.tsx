import React from 'react'
import "./StudyingUserBar.css"
import StudyingUserStatus from './StudyingUserStatus/StudyingUserStatus'

function StudyingUsersBar() {
  return (
    <div className='StudyingUsersBar'>
        <div className='StudyingUserBarWrap'>
            <StudyingUserStatus/>
            <StudyingUserStatus/>
            <StudyingUserStatus/>
        </div>
    </div>
  )
}

export default StudyingUsersBar