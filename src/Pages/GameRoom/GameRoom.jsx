import React from 'react'
import Ballbreaker from './Games/Ballbreaker'

function GameRoom() {

  const cellStyling = 'flex b-full border-1 bg-gray-400/30 m-4 p-4' 

  return (
    <div className='min-h-screen h-full w-full'>
      <h2 className='text-3xl font-serif w-full flex justify-center items-center  '>
      Games Under Construction...
      </h2>
      <div className='grid grid-cols-6 bg-pink-300/50 gap-10 mx-4'>
        <div className={`w-full min-h-50 ${cellStyling} `} >
          <Ballbreaker w={240} h={150} />
        </div>
      </div>
    </div>
  )
}

export default GameRoom