import React from 'react'
import '../loading/Loading.css'

const Loading = () => {
  return (
   <div className='flex justify-center items-center h-[300px]'>
     <div className="dashed-loading"></div>
   </div>
  )
}

export default Loading