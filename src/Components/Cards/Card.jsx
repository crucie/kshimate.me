import React, { Children } from 'react'

const Card = ({Children}) => {
  return (
    <div className='w-full h-full bg-amber-400/30'>
      {Children}
    </div>
  )
}

export default Card