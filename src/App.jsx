import { useState } from 'react'
import './App.css'
import { FloatingDock } from './Components/ui/FloatingDock'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'




function App() {

  const items = [
    { title: 'Home', icon: <HomeIcon />, href: '/' },
    { title: 'About', icon: <AboutIcon />, href: '/about' },
    // Add more items as needed
  ];

  return (
    <>
      <Router>
      <FloatingDock items={items} desktopClassName="fixed bottom-0 " mobileClassName="fixed bottom-0 right-0" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </>
  )
}


const HomeIcon = () => <div>🏠</div>;
const AboutIcon = () => <div>ℹ️</div>;

const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;

export default App
