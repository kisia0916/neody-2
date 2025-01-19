import ProfileTab from '@/components/Profile/ProfileTab/ProfileTab'
import UserProfile from '@/components/Profile/UserProfile/UserProfile'
import UserRecords from '@/components/Profile/UserRecords/UserRecords'
import React from 'react'

function page() {
  return (
    <>
      <UserProfile/>
      {/* //以下use clientで記述できるようにする */}
      <ProfileTab/>
      <UserRecords/>
    </>
  )
}

export default page