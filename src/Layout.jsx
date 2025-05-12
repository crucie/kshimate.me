import React from 'react'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Background from './Components/Background/Background.jsx'
import InteractiveGrid from './Components/Background/InteractiveGrid.jsx'
import Draggable from './Components/Quirky/Draggable.jsx'
import Nav from './Components/Navigation/Nav.jsx'

export default function Layout() {
  return (
    <>
    <Background>
        <Draggable allowDragOnlyWhenScrolled>
              <Nav/>
        </Draggable>
        <Outlet/>
    </Background>
    {/* <InteractiveGrid>
        <Draggable allowDragOnlyWhenScrolled>
              <Nav/>
        </Draggable>
        <Outlet/>
    </InteractiveGrid> */}
    </>
  )
}
