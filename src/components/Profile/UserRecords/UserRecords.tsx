"use client"
import React from 'react'
import "./UserRecords.css"
import UserStudyRecord from '@/components/Home/TimeLine/UserStudyRecord/UserStudyRecord'

function UserRecords() {
  return (
    <div className='UserRecords'>
        <UserStudyRecord/>
        <UserStudyRecord/>
        <UserStudyRecord/>
        <UserStudyRecord/>
        <UserStudyRecord/>

    </div>
  )
}

export default UserRecords