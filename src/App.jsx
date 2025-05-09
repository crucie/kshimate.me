import { useState } from 'react'
import './App.css'
import Background from './Components/Background/Background'
import Home from './Pages/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Background>
      <Home/>
    </Background>
    </>
  )
}

export default App
