import React from 'react'
import { Outlet } from 'react-router-dom'
import { FloatingDock } from './Components/ui/FloatingDock'

function Layout() {
  return (
    <>
        <FloatingDock/>
        <Outlet/>   
    </>
  )
}

export default Layout
