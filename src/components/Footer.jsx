import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;