import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Circle } from 'lucide-react';

const Nav = () => {
  const navRef = useRef(null);
  const dragIconRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'GAMEROOM', path: '/gameroom' },
  ];

  const linkStyle = 'px-4 py-2 text-base rounded hover:bg-black/10 transition';

  // Handle dragging only from the menu icon
  const onMouseDown = (e) => {
    if (e.target.closest('#nav-drag-icon')) {
      offset.current = {
        x: e.clientX - navRef.current.getBoundingClientRect().left,
        y: e.clientY - navRef.current.getBoundingClientRect().top,
      };
      setDragging(true);
    }
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;
    setPosition({ x, y });
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  // Detect if navbar goes offscreen while scrolling and auto-fix
  useEffect(() => {
    const handleScroll = () => {
      const navBounds = navRef.current?.getBoundingClientRect();
      if (!navBounds) return;

      const isMostlyOut =
        navBounds.bottom < 40 ||
        navBounds.top > window.innerHeight - 40 ||
        navBounds.left > window.innerWidth - 40 ||
        navBounds.right < 40;

      if (isMostlyOut) {
        // Snap back into view
        setPosition({ x: 10, y: 10 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        onMouseDown={onMouseDown}
        className="fixed z-50 flex items-center justify-between gap-4 max-w-4xl border-1 border-black shadow backdrop-blur-md rounded-full px-4 py-2 transition-all duration-200"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {/* Desktop Links */}
        <div className="hidden md:flex gap-3 items-center w-full justify-center">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? 'underline font-bold' : ''}`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Dropdown Toggle */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border rounded-md bg-white shadow"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-black/10 z-50 flex flex-col">
              {navLinks.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 hover:underline text-sm ${
                      isActive ? 'underline' : ''
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Drag Handle (Menu icon) */}
        <div
          id="nav-drag-icon"
          ref={dragIconRef}
          className="ml-auto cursor-grab p-2 rounded-md transition "
          title="Drag Navbar"
        >
          <Circle size={20} className='hover:bg-gray-500 hover:text-white active:bg-black rounded-full'/>
        </div>
      </nav>
    </>
  );
};

export default Nav;
