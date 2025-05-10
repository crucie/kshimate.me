
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// import Logo from '../Logo';

const Navlinks = ({ isMobile, closeMobileMenu }) => {
  
  const styling = "flex h-full text-xl px-auto py-3 items-center transition-colors duration-300" 

  return (
    <ul className={`flex ${isMobile ? 'flex-col w-full justify-center items-center gap-8 py-10 ' : 'text-black w-full gap-4 justify-center md:justify-between'}`}>
      <li>
        <NavLink 
          to="/" 
          className={({isActive}) => ` ${styling} ${isActive ? "bg-white/40" : "hover:bg-white/10"}`}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/projects" 
          className={({isActive}) => `${styling}  ${isActive ? "bg-white/40 " : "hover:bg-white/10"}`}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          PROJECTS
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/blogs" 
          className={({isActive}) => `${styling}  ${isActive ? "bg-white/40 " : "hover:bg-white/10"}`}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          BLOGS
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/gameroom" 
          className={({isActive}) => `${styling}  ${isActive ? "bg-white/40 " : "hover:bg-white/10"}`}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          GAMEROOM
        </NavLink>
      </li>
    </ul>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className='w-1/3 flex justify-center mx-auto border-1 rounded-full z-50 '>

        {/* Logo or Brand Name can go here */}
        {/* <Logo width='auto' height='60px' className='h-10 md:h-12'/> */}
        
        <div className='hidden md:flex md:flex-wrap w-4/5  overflow-hidden'>
          <Navlinks isMobile={false} />
        </div>
        
        <div className='md:hidden flex items-center text-white'>
          <button 
            onClick={toggleNavbar} 
            className="focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className='fixed inset-0 bg-[#800020] z-50 flex flex-col justify-center items-center overflow-hidden'>
          <div className="absolute top-4 right-6">
            <button 
              onClick={toggleNavbar} 
              className="text-white focus:outline-none p-2"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          
          <div className='flex flex-col items-center justify-center h-full w-full text-white'>
            <Navlinks isMobile={true} closeMobileMenu={closeMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;