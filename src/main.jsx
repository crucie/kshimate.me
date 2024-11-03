import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home.jsx'

const route = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>}/>
    </Route>
  ])
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router = {route}/> */}
    <App />
  </React.StrictMode>,
)
