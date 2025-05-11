import { useRef, useState, useEffect } from 'react';

export default function Draggable({ children }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging && ref.current) {
        const el = ref.current;
        const parent = document.documentElement;
        const rect = el.getBoundingClientRect();

        const elWidth = rect.width;
        const elHeight = rect.height;

        const viewportWidth = parent.clientWidth;
        const viewportHeight = parent.clientHeight;

        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;

        // Clamp to ensure at least 10% of width and height stays in view
        const minX = -0.9 * elWidth;
        const maxX = viewportWidth - 0.1 * elWidth;

        const minY = -0.9 * elHeight;
        const maxY = viewportHeight - 0.1 * elHeight;

        newX = Math.min(Math.max(newX, minX), maxX);
        newY = Math.min(Math.max(newY, minY), maxY);

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
  }, [dragging]);

  const handleMouseDown = (e) => {
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
      className="absolute cursor-move select-none"
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </div>
  );
}
