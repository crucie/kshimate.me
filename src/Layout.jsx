import React from 'react'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Background from './Components/Background/Background.jsx'
import InteractiveGrid from './Components/Background/InteractiveGrid.jsx'

export default function Layout() {
  return (
    <>
    <Background>
        <Header/>
            <Outlet/>
        <Footer/>
    </Background>
    {/* <InteractiveGrid>
        <Header/>
            <Outlet/>
        <Footer/>
    </InteractiveGrid> */}
    </>
  )
}
