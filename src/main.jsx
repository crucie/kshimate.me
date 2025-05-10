import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Layout from './Layout'
import Home from './Pages/Home/Home'
import Projects from './Pages/Projects/Projects'
import GameRoom from './Pages/GameRoom/GameRoom'
import Blogs from './Pages/Blogs/Blogs'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      {/* <Route path="*" element={<Notfound/>}/> */}
      <Route index element={<Home/>}/>
      <Route path='projects' element={<Projects/>}/>
      <Route path='gameroom' element={<GameRoom/>}/>
      <Route path='blogs' element={<Blogs/>}/>      
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
