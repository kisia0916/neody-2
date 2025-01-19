import React from 'react'
import "./PointViewer.css"

function PointViewer(props:{type:"week"|"all"}) {
  return (
    <>
    {props.type === "week"?
        <div className='WeekPointL'>
            <span className='WeekPointTitleL'>今週</span><span className='WeekPointPointL'>1600pt</span>
        </div>
        :
        <div className='AllPointL'>
            <span className='AllPointTitleL'>累計</span><span className='AllPointPointL'>1600pt</span>
        </div>
    }
    </>
  )
}

export default PointViewer