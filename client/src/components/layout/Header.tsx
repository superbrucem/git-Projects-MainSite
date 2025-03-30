import { useState } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">Bruce Maber</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">/dev</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/projects') ? 'text-primary' : ''}`}
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : ''}`}
            >
              About
            </Link>
            <ThemeToggle />
          </nav>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle className="mr-2" />
            <button 
              className="flex items-center justify-center rounded-md h-9 w-9 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
