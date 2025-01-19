import React from 'react'
import "./UserProfile.css"
import PointViewer from '@/components/common/PointViewer/PointViewer'

function UserProfile() {
  return (
    <div className='UserProfile'>
        <div className='ProfileTop'>
            <div className='ProfileTopStatus'>
                <div className='ProfileIconWarp'>
                    <img src='/user/icon/fumi.jpg' className='ProfileIcon'/>
                </div>
                <div className='ProfileUserDataWrap'>
                    <div className='ProfileUserData'>
                        <span className='ProfileUserName'>fumi0916</span>
                        <span className='ProfileUserFriends'>25人のフレンド</span>
                        <div className='ProfileUserPoints'>
                            <PointViewer type="week"/>
                            <PointViewer type="all"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ProfileTopInfoWarp'>
                <div className='ProfileTopInfo'>
                    <p className='ProfileTopUserId'>@kisia0012</p>
                    <span className='ProfileTopProfileText'>数学を頑張っていきたいです</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile