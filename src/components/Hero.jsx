import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { darkMode } = useTheme();
  const [typedName, setTypedName] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');

  const fullName = "Farizi Adam";
  const fullSubtitle = "Software Engineer | Web Developer";
  const fullDescription = "Creating elegant solutions to complex problems through clean, efficient code.";

  useEffect(() => {
    let isMounted = true;
    let nameIndex = 0;
    let subtitleIndex = 0;
    let descriptionIndex = 0;

    const typeTexts = () => {
      if (isMounted) {
        // Type name
        if (nameIndex <= fullName.length) {
          setTypedName(fullName.slice(0, nameIndex));
          nameIndex++;
        }

        // Start typing subtitle after name is complete
        if (nameIndex > fullName.length && subtitleIndex <= fullSubtitle.length) {
          setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
          subtitleIndex++;
        }

        // Start typing description after subtitle is complete
        if (nameIndex > fullName.length && 
            subtitleIndex > fullSubtitle.length && 
            descriptionIndex <= fullDescription.length) {
          setTypedDescription(fullDescription.slice(0, descriptionIndex));
          descriptionIndex++;
        }

        // Continue typing if any text is incomplete
        if (nameIndex <= fullName.length || 
            subtitleIndex <= fullSubtitle.length || 
            descriptionIndex <= fullDescription.length) {
          setTimeout(typeTexts, 50); // Adjust speed of typing (50ms between characters)
        }
      }
    };

    typeTexts();

    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 px-4 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {typedName}
            {typedName.length < fullName.length && <span className="animate-pulse">|</span>}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-500 dark:text-blue-400 mb-6">
            {typedSubtitle}
            {typedName.length === fullName.length && 
             typedSubtitle.length < fullSubtitle.length && 
             <span className="animate-pulse">|</span>}
          </h2>
          <p className="text-lg mb-8 max-w-md">
            {typedDescription}
            {typedName.length === fullName.length && 
             typedSubtitle.length === fullSubtitle.length && 
             typedDescription.length < fullDescription.length && 
             <span className="animate-pulse">|</span>}
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
              src="/images/farizi.jpg" 
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