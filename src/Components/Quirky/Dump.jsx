import { useState, useEffect, useRef } from 'react';
import Draggable from './Draggable.jsx';

// BentoGrid component that manages the layout
export default function Dump({ children }) {
  const [items, setItems] = useState([]);
  const [grid, setGrid] = useState([]);
  const gridRef = useRef(null);
  const gridSize = { cols: 4, rows: 3 }; // Default grid size

  // Process children into manageable items on mount
  useEffect(() => {
    if (!children) return;
    
    // Convert children to array if it's not already
    const childrenArray = Array.isArray(children) ? children : [children];
    
    // Create items from children
    const newItems = childrenArray.map((child, index) => ({
      id: `item-${index}`,
      content: child,
      position: { x: 0, y: 0 },
      size: { w: 1, h: 1 }, // Default size
      inGrid: true
    }));
    
    setItems(newItems);
  }, [children]);

  // Calculate grid layout whenever items change
  useEffect(() => {
    if (items.length === 0) return;
    
    // Filter only items that are in the grid
    const gridItems = items.filter(item => item.inGrid);
    
    // Simple layout algorithm
    let newGrid = [];
    let row = 0;
    let col = 0;
    
    gridItems.forEach(item => {
      // Find a place in the grid
      while (isPositionOccupied(newGrid, col, row)) {
        col++;
        if (col >= gridSize.cols) {
          col = 0;
          row++;
        }
      }
      
      // Place the item
      newGrid.push({
        ...item,
        position: { x: col, y: row }
      });
      
      // Move to next position
      col++;
      if (col >= gridSize.cols) {
        col = 0;
        row++;
      }
    });
    
    setGrid(newGrid);
  }, [items]);

  // Helper to check if a position is already occupied
  const isPositionOccupied = (grid, x, y) => {
    return grid.some(item => 
      item.position.x === x && 
      item.position.y === y
    );
  };

  // Remove item from grid and make it floating
  const removeFromGrid = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, inGrid: false }
          : item
      )
    );
  };

  // Return item to grid
  const returnToGrid = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, inGrid: true }
          : item
      )
    );
  };

  return (
    <div className="relative min-h-screen bg-black p-6">
      {/* Grid container */}
      <div 
        ref={gridRef}
        className="grid gap-4 max-w-6xl mx-auto bg-gray-900 p-4 rounded-xl"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(100px, 1fr))`,
          minHeight: '600px'
        }}
      >
        {/* Render items that are in the grid */}
        {grid.map(item => (
          <div
            key={item.id}
            className="relative"
            style={{
              gridColumn: `${item.position.x + 1} / span ${item.size.w}`,
              gridRow: `${item.position.y + 1} / span ${item.size.h}`
            }}
          >
            <div className="h-full w-full bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 relative">
              {item.content}
              <button 
                className="absolute bottom-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
                onClick={() => removeFromGrid(item.id)}
              >
                Drag Out
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floated items that have been dragged out */}
      {items
        .filter(item => !item.inGrid)
        .map(item => (
          <Draggable key={item.id}>
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 w-64">
              {item.content}
              <button 
                className="mt-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
                onClick={() => returnToGrid(item.id)}
              >
                Return to Grid
              </button>
            </div>
          </Draggable>
        ))}
    </div>
  );
}

// Example usage component
// export function BentoGridExample() {
//   // Sample items for the bento grid
//   const items = [
//     <div key="1" className="text-white">Main Project A</div>,
//     <div key="2" className="text-white">Feature Project B</div>,
//     <div key="3" className="text-white">Mini Project 1</div>,
//     <div key="4" className="text-white">Mini Project 2</div>,
//     <div key="5" className="text-white">Mini Project 3</div>,
//     <div key="6" className="text-white">Mini Project 4</div>,
//     <div key="7" className="text-white">Side Project X</div>,
//     <div key="8" className="text-white">Experiment Y</div>,
//   ];

//   return (
//     <div className="min-h-screen bg-black">
//       <h1 className="text-3xl font-bold text-white text-center p-4">Draggable Bento Grid</h1>
//       <p className="text-gray-400 text-center mb-8">Click "Drag Out" to remove items from the grid.</p>
      
//       <BentoGrid>
//         {items}
//       </BentoGrid>
//     </div>
//   );
// }