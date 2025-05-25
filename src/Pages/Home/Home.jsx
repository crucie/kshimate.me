import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import UserCard from '../../Components/Cards/UserCard'
import Draggable from '../../Components/Quirky/Draggable'
import Nav from '../../Components/Navigation/Nav'
import Card from '../../Components/Cards/Card'
import WebPrompter from '../Projects/Scraps/DoNothing/Teleprompter/WebPrompter'
import { TableOfContents } from 'lucide-react'

function Home() {
  const posX = window.innerWidth/4
  const posY = window.innerWidth/8

  const [webPrompterActive, setWebPrompterActive] = useState(false)

  const togglePrompter = () => {
    setWebPrompterActive(!webPrompterActive)
    console.log(webPrompterActive)
  }

  return (
    <div className='w-full h-full flex justify-center'>
      <Draggable posX={posX} posY={posY}>
          <UserCard
            Title="AMAY MISHRA"
            Description="A silly guy on screen. Try dragging this card >.<"
            Image="https://res.cloudinary.com/dewuod6wo/image/upload/v1747423300/imposter_1_ueyksb.png"
          />
      </Draggable>
      {/* <button 
      className='border p-6 text-xl bg-gray-400/50 mt-100'
      onClick={togglePrompter}>
        GET PROMPTER
      </button>
      {webPrompterActive && 
      <Draggable posX={posX+500} posY={posY+200}>
        <div className=' bg-amber-500/'>
          <WebPrompter/>
        </div>
      </Draggable> 
      }
       */}

      <div>
        <div className='border w-250 h-100 m-4 bg-white p-4'>
          >BOX for all
        </div>
        
      </div>

    </div>
  )
}

export default Home