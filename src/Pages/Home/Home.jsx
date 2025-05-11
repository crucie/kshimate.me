import React from 'react'
import Header from '../../Components/Header/Header'
import UserCard from '../../Components/Cards/UserCard'
import Draggable from '../../Components/Quirky/Draggable'
import Nav from '../../Components/Navigation/Nav'

function Home() {
  return (
    <div>
      
      YO
      <Draggable>
          <UserCard
            Title="John Doe"
            Description="A software engineer with a passion for open-source."
            Image="https://via.placeholder.com/150"
            Tags={['React', 'JavaScript', 'CSS']}
          />
      </Draggable>
    </div>
  )
}

export default Home