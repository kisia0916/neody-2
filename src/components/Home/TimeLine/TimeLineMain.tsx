"use client"
import React from 'react'
import "./TimeLineMain.css"
import UserStudyRecord from './UserStudyRecord/UserStudyRecord'
import TimeLineStatusMain from './TimeLineStatus/TimeLineStatusMain'

function TimeLineMain() {
  return (
    <div className='TimeLineMain'>
        <TimeLineStatusMain/>
        <UserStudyRecord/>
        <UserStudyRecord/>
        <UserStudyRecord/>
        <UserStudyRecord/>

    </div>
  )
}

export default TimeLineMain