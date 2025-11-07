import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md relative">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyReactApp</Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Simple hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
          <Link to="/data" className="hover:text-blue-500">API Data</Link>
          <Button onClick={toggleTheme} variant="secondary">
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-100 dark:bg-gray-800 shadow-md z-10">
          <div className="flex flex-col items-center p-4 space-y-3">
            <Link to="/" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/tasks" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Tasks</Link>
            <Link to="/data" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>API Data</Link>
            <Button onClick={() => { toggleTheme(); setIsMenuOpen(false); }} variant="secondary" className="w-full">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;