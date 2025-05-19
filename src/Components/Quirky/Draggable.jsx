import { useState, useEffect, useRef } from 'react';

export default function Draggable({ 
  children, 
  allowDragOnlyWhenScrolled = false,
  initialPosition = null,
  dragHandleClassName = null,
  posX = 0 , posY = 0 
}) {
  // Container reference to track the element
  const containerRef = useRef(null);
  
  // Track if currently dragging
  const [dragging, setDragging] = useState(false);
  
  // Position state - only updated when drag ends for smoother operation
  const [position, setPosition] = useState({ x : posX, y : posY });
  
  // Use refs for real-time position tracking during drag
  const currentPosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  
  // Whether dragging is allowed
  const [canDrag, setCanDrag] = useState(!allowDragOnlyWhenScrolled);

  // Track if component is initialized
  const initialized = useRef(false);

  // Initialize position once component mounts
  useEffect(() => {
    if (!initialized.current && containerRef.current) {
      let initialPos;
      
      if (initialPosition) {
        // Use provided initial position
        initialPos = initialPosition;
      } else {
        // Calculate position from current layout
        const rect = containerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(containerRef.current);
        
        // Get original position accounting for margins and scroll
        initialPos = { 
          x: rect.left + window.scrollX - (parseFloat(computedStyle.marginLeft) || 0), 
          y: rect.top + window.scrollY - (parseFloat(computedStyle.marginTop) || 0)
        };
      }
      
      // Set both state and ref
      setPosition(initialPos);
      currentPosition.current = initialPos;
      
      // Force a proper position calculation after initial render
      setTimeout(() => {
        if (containerRef.current) {
          const updatedRect = containerRef.current.getBoundingClientRect();
          const newPos = { 
            x: updatedRect.left + window.scrollX, 
            y: updatedRect.top + window.scrollY 
          };
          setPosition(newPos);
          currentPosition.current = newPos;
        }
      }, 0);
      
      initialized.current = true;
    }
  }, [initialPosition]);

  // Handle scroll detection for conditional dragging
  useEffect(() => {
    if (allowDragOnlyWhenScrolled) {
      const handleScroll = () => {
        setCanDrag(window.scrollY > 10);
      };
      
      // Initialize scroll state
      handleScroll();
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [allowDragOnlyWhenScrolled]);

  // Apply direct style updates for smooth dragging
  useEffect(() => {
    if (!containerRef.current) return;
    
    containerRef.current.style.left = `${position.x}px`;
    containerRef.current.style.top = `${position.y}px`;
  }, [position]);

  // Handle mouse down to start dragging
  const handleMouseDown = (e) => {
    if (!canDrag || !containerRef.current) return;
    
    // Check if using drag handle and clicked on valid element
    if (dragHandleClassName && 
        !e.target.classList.contains(dragHandleClassName) &&
        !e.target.closest(`.${dragHandleClassName}`)) {
      return;
    }
    
    e.preventDefault();
    
    // Store mouse starting position
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    
    // Start dragging
    setDragging(true);
    
    // Set visual cues
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    
    // Setup direct DOM manipulation for smooth dragging
    const handleMouseMove = (moveEvent) => {
      // Calculate movement delta
      const deltaX = moveEvent.clientX - lastMousePosition.current.x;
      const deltaY = moveEvent.clientY - lastMousePosition.current.y;
      
      // Update reference positions
      lastMousePosition.current = { x: moveEvent.clientX, y: moveEvent.clientY };
      currentPosition.current = {
        x: currentPosition.current.x + deltaX,
        y: currentPosition.current.y + deltaY
      };
      
      // Apply position directly to DOM for maximum smoothness
      if (containerRef.current) {
        containerRef.current.style.left = `${currentPosition.current.x}px`;
        containerRef.current.style.top = `${currentPosition.current.y}px`;
      }
    };
    
    const handleMouseUp = () => {
      // End dragging
      setDragging(false);
      
      // Sync React state with final position
      setPosition({ ...currentPosition.current });
      
      // Reset visual cues
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Support for touch devices
  const handleTouchStart = (e) => {
    if (!canDrag || !containerRef.current || e.touches.length !== 1) return;
    
    // Check if using drag handle and touched on valid element
    if (dragHandleClassName && 
        !e.target.classList.contains(dragHandleClassName) &&
        !e.target.closest(`.${dragHandleClassName}`)) {
      return;
    }
    
    e.preventDefault();
    
    // Store touch starting position
    const touch = e.touches[0];
    lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    
    // Start dragging
    setDragging(true);
    
    // Set visual cues
    document.body.style.userSelect = 'none';
    
    // Setup direct DOM manipulation for smooth dragging
    const handleTouchMove = (moveEvent) => {
      if (moveEvent.touches.length !== 1) return;
      
      const touch = moveEvent.touches[0];
      
      // Calculate movement delta
      const deltaX = touch.clientX - lastMousePosition.current.x;
      const deltaY = touch.clientY - lastMousePosition.current.y;
      
      // Update reference positions
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
      currentPosition.current = {
        x: currentPosition.current.x + deltaX,
        y: currentPosition.current.y + deltaY
      };
      
      // Apply position directly to DOM for maximum smoothness
      if (containerRef.current) {
        containerRef.current.style.left = `${currentPosition.current.x}px`;
        containerRef.current.style.top = `${currentPosition.current.y}px`;
      }
    };
    
    const handleTouchEnd = () => {
      // End dragging
      setDragging(false);
      
      // Sync React state with final position
      setPosition({ ...currentPosition.current });
      
      // Reset visual cues
      document.body.style.userSelect = '';
      
      // Remove event listeners
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    // Add event listeners
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        cursor: canDrag ? 'grab' : 'default',
        zIndex: dragging ? 1000 : 'auto',
        transform: 'translate3d(0,0,0)', // Force GPU acceleration
        willChange: dragging ? 'left, top' : 'auto', // Hint to browser for optimization
      }}
    >
      {children}
    </div>
  );
}