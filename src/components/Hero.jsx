import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { darkMode } = useTheme();
  
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 px-4 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Name</h1>
          <h2 className="text-xl md:text-2xl text-blue-500 dark:text-blue-400 mb-6">Software Engineer | Web Developer</h2>
          <p className="text-lg mb-8 max-w-md">
            Creating elegant solutions to complex problems through clean, efficient code.
          </p>
          <div className="flex space-x-4">
            <a href="#contact" className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
              Hire Me
            </a>
            <a href="#projects" className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors dark:text-white`}>
              View Work
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden group">
            <img 
              src="/images/profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;