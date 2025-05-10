import React, { useRef, useEffect, useState } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const [cells, setCells] = useState({});
  const cellSize = 15;
  
  // Set up the grid dimensions based on the window size
  const gridWidth = Math.ceil(window.innerWidth / cellSize);
  const gridHeight = Math.ceil(window.innerHeight / cellSize);
  
  // Colors
  const primaryColor = '#800000'; // Maroon
  const backgroundColor = '#ffffff'; // White
  
  // Fade the cells over time
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setCells(prevCells => {
        const newCells = { ...prevCells };
        let hasChanges = false;
        
        Object.keys(newCells).forEach(key => {
          if (newCells[key] > 0.1) {
            newCells[key] -= 0.999; // Reduce opacity gradually
            hasChanges = true;
          } else {
            delete newCells[key]; // Remove nearly invisible cells
            hasChanges = true;
          }
        });
        
        return hasChanges ? newCells : prevCells;
      });
    }, 100);
    
    return () => clearInterval(fadeInterval);
  }, []);
  
  // Draw the grid and colored cells
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    
    // Vertical lines
    for (let x = 0; x <= width; x += cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
    
    // Draw colored cells (trails)
    Object.entries(cells).forEach(([key, opacity]) => {
      const [cellX, cellY] = key.split(',').map(Number);
      ctx.fillStyle = `rgba(128, 0, 0, ${opacity})`;
      ctx.fillRect(
        cellX * cellSize,
        cellY * cellSize,
        cellSize,
        cellSize
      );
    });
    
    // Draw current hover cell and surroundings if mouse is on canvas
    if (mousePosition.x >= 0 && mousePosition.y >= 0) {
      const centerX = mousePosition.x;
      const centerY = mousePosition.y;
      
      // Draw surrounding cells with gradient
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cellX = centerX + dx;
          const cellY = centerY + dy;
          
          if (cellX >= 0 && cellX < gridWidth && cellY >= 0 && cellY < gridHeight) {
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= 2) {
              const opacity = distance === 0 ? 0.8 : (1 - distance / 2.5) * 0.5;
              ctx.fillStyle = `rgba(128, 0, 0, ${opacity})`;
              ctx.fillRect(
                cellX * cellSize,
                cellY * cellSize,
                cellSize,
                cellSize
              );
            }
          }
        }
      }
    }
  }, [mousePosition, cells, cellSize]);
  
  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track mouse position
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    
    setMousePosition({ x: cellX, y: cellY });
    
    // Add current cell to cells with full opacity
    setCells(prev => ({
      ...prev,
      [`${cellX},${cellY}`]: 1.0
    }));
  };
  
  const handleMouseLeave = () => {
    setMousePosition({ x: -1, y: -1 });
  };
  
  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-screen block"
    />
  );
}