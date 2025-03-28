import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'}`}>
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Farizi Adam. All rights reserved.</p>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;