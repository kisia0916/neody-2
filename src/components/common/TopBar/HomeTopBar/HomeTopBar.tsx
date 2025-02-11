import React from 'react'
import "./HomeTopBar.css"
import UserInfo from '../UserInfo/UserInfo'

function HomeHomeTopBar() {
  return (
    <div className='HomeTopBar'>
      <div className='HomeTopBarContent HomeTopBarLeft'>
        <span className='HomeTopBarTitle'>Timeorb</span>
      </div>
      <div className='HomeTopBarContent HomeTopBarRight'>
        <UserInfo/>
      </div>
    </div>
  )
}

export default HomeHomeTopBar