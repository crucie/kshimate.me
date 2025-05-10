import React from 'react'

function Background({children}) {
  return (
    <div 
      className="w-full min-h-screen h-full p-5" 
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), 
          linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0',
        backgroundColor: 'white'
      }}
    >
        {children}
    </div>

  )
}

export default Background