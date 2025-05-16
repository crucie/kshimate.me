// import { useState, useEffect, useRef } from 'react';

// export default function Draggable({ children, allowDragOnlyWhenScrolled }) {
//   const ref = useRef(null);
//   const [dragging, setDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const offset = useRef({ x: 0, y: 0 });
//   const [canDrag, setCanDrag] = useState(!allowDragOnlyWhenScrolled);

//   useEffect(() => {
//     if (allowDragOnlyWhenScrolled) {
//       const handleScroll = () => {
//         setCanDrag(window.scrollY > 10);
//       };
//       window.addEventListener('scroll', handleScroll);
//       return () => window.removeEventListener('scroll', handleScroll);
//     }
//   }, [allowDragOnlyWhenScrolled]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (dragging && canDrag && ref.current) {
//         const newX = e.clientX - offset.current.x;
//         const newY = e.clientY - offset.current.y;
//         setPosition({ x: newX, y: newY });
//       }
//     };
//     const handleMouseUp = () => setDragging(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [dragging, canDrag]);

//   const handleMouseDown = (e) => {
//     if (!canDrag) return;
//     if (ref.current) {
//       offset.current = {
//         x: e.clientX - ref.current.offsetLeft,
//         y: e.clientY - ref.current.offsetTop,
//       };
//       setDragging(true);
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       onMouseDown={handleMouseDown}
//       className="relative"
//       style={{ left: position.x, top: position.y }}
//     >
//       {children}
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';

export default function Draggable({ 
  children, 
  allowDragOnlyWhenScrolled = false,
  initialPosition = null, // Allow setting initial position
  dragHandleClassName = null, // Optional class name for drag handle
}) {
  // Container reference to track the element
  const containerRef = useRef(null);
  
  // Track if currently dragging
  const [dragging, setDragging] = useState(false);
  
  // Store the current position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Store initial position to remember where element started
  const [initialPos, setInitialPos] = useState(null);
  
  // Reference to store mouse offset during drag
  const mouseOffset = useRef({ x: 0, y: 0 });
  
  // Whether dragging is allowed (used with allowDragOnlyWhenScrolled)
  const [canDrag, setCanDrag] = useState(!allowDragOnlyWhenScrolled);

  // Track if component is initialized
  const isInitialized = useRef(false);

  // Initialize position once component mounts
  useEffect(() => {
    if (!isInitialized.current && containerRef.current) {
      // If initialPosition was provided, use it
      if (initialPosition) {
        setPosition(initialPosition);
        setInitialPos(initialPosition);
      } else {
        // Otherwise, maintain the default CSS positioning
        const rect = containerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(containerRef.current);
        
        // Get the original position considering CSS positioning
        const originalLeft = rect.left - (parseFloat(computedStyle.marginLeft) || 0);
        const originalTop = rect.top - (parseFloat(computedStyle.marginTop) || 0);
        
        const newPos = { x: originalLeft, y: originalTop };
        setPosition(newPos);
        setInitialPos(newPos);
      }
      
      isInitialized.current = true;
    }
  }, [initialPosition]);

  // Set up scroll listener if allowDragOnlyWhenScrolled is true
  useEffect(() => {
    if (allowDragOnlyWhenScrolled) {
      const handleScroll = () => {
        setCanDrag(window.scrollY > 10);
      };
      
      // Initialize value on mount
      handleScroll();
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [allowDragOnlyWhenScrolled]);

  // Handle mouse/touch events for dragging
  useEffect(() => {
    // Handler for mouse movement during drag
    const handleMouseMove = (e) => {
      if (dragging && canDrag) {
        e.preventDefault(); // Prevent text selection during drag
        
        // Calculate new position based on mouse movement and offset
        const newX = e.clientX - mouseOffset.current.x;
        const newY = e.clientY - mouseOffset.current.y;
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setPosition({ x: newX, y: newY });
        });
      }
    };

    // Handler for when the mouse button is released
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    // Add event listeners when dragging starts
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none'; // Prevent text selection during drag
    }

    // Clean up event listeners when dragging stops or component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, canDrag]);

  // Function to handle mouse down event
  const handleMouseDown = (e) => {
    // Skip if dragging is not allowed or if target is not the drag handle (when specified)
    if (!canDrag) return;
    if (dragHandleClassName && 
        !e.target.classList.contains(dragHandleClassName) &&
        !e.target.closest(`.${dragHandleClassName}`)) {
      return;
    }
    
    // Prevent default to avoid text selection
    e.preventDefault();
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate offset from current mouse position to element's top-left corner
      mouseOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      setDragging(true);
      document.body.style.cursor = 'grabbing';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none', // Prevent scrolling on touch devices when dragging
        cursor: canDrag ? 'grab' : 'default',
        transition: dragging ? 'none' : 'box-shadow 0.2s',
        zIndex: dragging ? 1000 : 'auto', // Raise z-index when dragging
      }}
    >
      {children}
    </div>
  );
}
