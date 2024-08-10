import React, { useState } from 'react'
import moment from 'moment'

function Clock() {

    const curTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    const [time, setTime] = useState(curTime)

    const update = () =>{
        const curTime = moment().format('MMMM Do YYYY, h:mm:ss a')
        setTime(curTime)
    }

    setInterval(()=>{
        update()
    },1000)

  return (
    <>
        <div className='clock'>
            <h5>{time}</h5>
        </div>
    </>
  )
}

export default Clock