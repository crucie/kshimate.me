import { useState, useEffect, useRef } from 'react';

export default function Draggable({ children, allowDragOnlyWhenScrolled }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const [canDrag, setCanDrag] = useState(!allowDragOnlyWhenScrolled);

  useEffect(() => {
    if (allowDragOnlyWhenScrolled) {
      const handleScroll = () => {
        setCanDrag(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [allowDragOnlyWhenScrolled]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging && canDrag && ref.current) {
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        setPosition({ x: newX, y: newY });
      }
    };
    const handleMouseUp = () => setDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, canDrag]);

  const handleMouseDown = (e) => {
    if (!canDrag) return;
    if (ref.current) {
      offset.current = {
        x: e.clientX - ref.current.offsetLeft,
        y: e.clientY - ref.current.offsetTop,
      };
      setDragging(true);
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className="absolute"
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </div>
  );
}
