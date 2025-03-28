import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 z-50 h-1 bg-blue-500" 
      style={{ 
        width: `${scrollProgress}%`,
        transformOrigin: 'left center'
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default ScrollProgressBar;