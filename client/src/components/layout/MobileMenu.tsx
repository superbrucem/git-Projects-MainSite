import { Link, useLocation } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu = ({ isOpen, closeMenu }: MobileMenuProps) => {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;
  
  const handleClick = () => {
    closeMenu();
  };
  
  return (
    <div 
      className={`md:hidden bg-background border-t border-gray-200 dark:border-gray-800 animate-slide-up ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="px-4 pt-2 pb-3 space-y-1">
        <Link 
          href="/" 
          onClick={handleClick}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isActive('/') ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`}
        >
          Home
        </Link>
        <Link 
          href="/projects" 
          onClick={handleClick}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isActive('/projects') ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`}
        >
          Projects
        </Link>
        <Link 
          href="/about" 
          onClick={handleClick}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isActive('/about') ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
