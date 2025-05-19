import React from 'react'
import Header from '../../Components/Header/Header'
import UserCard from '../../Components/Cards/UserCard'
import Draggable from '../../Components/Quirky/Draggable'
import Nav from '../../Components/Navigation/Nav'
import Card from '../../Components/Cards/Card'
import WebPrompter from '../Projects/Scraps/DoNothing/Teleprompter/WebPrompter'

function Home() {
  const posX = window.innerWidth/4
  const posY = window.innerWidth/8

  return (
    <div className='w-full flex justify-center'>
      <Draggable posX={posX} posY={posY}>
          <UserCard
            Title="AMAY MISHRA"
            Description="A silly guy on screen. Try dragging this card >.<"
            Image="https://res.cloudinary.com/dewuod6wo/image/upload/v1747423300/imposter_1_ueyksb.png"
          />
      </Draggable>
      <Draggable posX={posX+500} posY={posY+200}>
        
      </Draggable>
      <div className=' w-full mt-200'>
          <WebPrompter/>
      </div>
    </div>
  )
}

export default Home