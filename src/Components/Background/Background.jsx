import React from 'react'

function Background({children}) {
  return (
    <div 
      className="relative w-full min-h-screen" // Remove fixed height constraints
    >
      <div 
        className="fixed inset-0 w-full h-full" // Fixed background layer
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0',
          backgroundColor: 'white',
          zIndex: -1, // Place grid behind content
        }}
      />
      <div className="relative w-full min-h-screen p-5 ">
        {children}
      </div>
    </div>
  )
}

export default Background