import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { darkMode } = useTheme();
  const [typedName, setTypedName] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullName = "Farizi Adam";
  const fullSubtitle = "Software Engineer | Web Developer";
  const fullDescription = "Creating elegant solutions to complex problems through clean, efficient code.";

  useEffect(() => {
    let nameIndex = 0;
    let subtitleIndex = 0;
    let descriptionIndex = 0;
    let isMounted = true;

    const cursorInterval = setInterval(() => {
      if (isMounted) setShowCursor(prev => !prev);
    }, 500);

    const typeTexts = () => {
      if (isMounted) {
        if (nameIndex <= fullName.length) {
          setTypedName(fullName.slice(0, nameIndex));
          nameIndex++;
        }

        if (nameIndex > fullName.length && subtitleIndex <= fullSubtitle.length) {
          setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
          subtitleIndex++;
        }

        if (nameIndex > fullName.length && 
            subtitleIndex > fullSubtitle.length && 
            descriptionIndex <= fullDescription.length) {
          setTypedDescription(fullDescription.slice(0, descriptionIndex));
          descriptionIndex++;
        }

        if (nameIndex <= fullName.length || 
            subtitleIndex <= fullSubtitle.length || 
            descriptionIndex <= fullDescription.length) {
          setTimeout(typeTexts, 50);
        }
      }
    };

    typeTexts();

    return () => {
      isMounted = false;
      clearInterval(cursorInterval);
    };
  }, []);
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="home" 
      className="pt-24 md:pt-32 pb-16 px-4 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 h-16">
            {typedName}
            {showCursor && typedName.length < fullName.length && <span className="animate-pulse">|</span>}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-500 dark:text-blue-400 mb-6 h-10">
            {typedSubtitle}
            {showCursor && typedName.length === fullName.length && 
             typedSubtitle.length < fullSubtitle.length && 
             <span className="animate-pulse">|</span>}
          </h2>
          <p className="text-lg mb-8 max-w-md h-24">
            {typedDescription}
            {showCursor && typedName.length === fullName.length && 
             typedSubtitle.length === fullSubtitle.length && 
             typedDescription.length < fullDescription.length && 
             <span className="animate-pulse">|</span>}
          </p>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex space-x-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
            >
              Hire Me
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors dark:text-white`}
            >
              View Work
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-64 h-64 rounded-full overflow-hidden group shadow-2xl"
          >
            <img 
              src="/images/farizi.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              className="absolute inset-0 bg-blue-500 bg-opacity-20 opacity-0 transition-opacity duration-300"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;