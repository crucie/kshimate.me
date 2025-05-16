import React from 'react'
import Header from '../../Components/Header/Header'
import UserCard from '../../Components/Cards/UserCard'
import Draggable from '../../Components/Quirky/Draggable'
import Nav from '../../Components/Navigation/Nav'

function Home() {
  return (
    <div className='w-full flex justify-center'>
      <Draggable>
          <UserCard
            Title="AMAY MISHRA"
            Description="A silly guy on screen. Try dragging this card >.<"
            Image="https://res.cloudinary.com/dewuod6wo/image/upload/v1747423300/imposter_1_ueyksb.png"
          />
          
      </Draggable>
      
    </div>
  )
}

export default Home