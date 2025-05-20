import React, { useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

// Floating shape component
const FloatingShape = ({ type, size, left, top, delay, duration, rotate, color }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateValue = useMotionValue(0);
  
  // Animate the shape
  React.useEffect(() => {
    const animate = () => {
      x.set(Math.sin(rotateValue.get() * 0.01) * 20);
      y.set(Math.cos(rotateValue.get() * 0.01) * 20);
      rotateValue.set(rotateValue.get() + 0.5);
      requestAnimationFrame(animate);
    };
    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, [x, y, rotateValue]);

  const shapeStyle = {
    position: 'absolute',
    left: `${left}%`,
    top: `${top}%`,
    width: size,
    height: size,
    x,
    y,
    rotate: rotateValue,
    opacity: 0.6,
    filter: 'blur(1px)',
    transition: 'all 0.5s ease-out'
  };

  const renderShape = () => {
    switch (type) {
      case 'circle':
        return <motion.div style={{...shapeStyle, borderRadius: '50%', backgroundColor: color }} />;
      case 'square':
        return <motion.div style={{...shapeStyle, borderRadius: '8px', backgroundColor: color }} />;
      case 'triangle':
        return (
          <motion.div 
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              borderLeftWidth: `${size/2}px`,
              borderRightWidth: `${size/2}px`,
              borderBottomWidth: size,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color
            }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration, delay }}
    >
      {renderShape()}
    </motion.div>
  );
};

const Hero = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef(null);

  // Parallax effect for scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullName = "Farizi Adam"; // Nama dengan spasi
  const fullSubtitle = "Software Engineer | Web Developer";
  const fullDescription = "Creating elegant solutions to complex problems through clean, efficient code.";

  const shapes = useMemo(() => [
    { type: 'circle', size: 100, left: 10, top: 20, delay: 0.2, duration: 3, rotate: 45, color: darkMode ? '#6366f1' : '#f59e0b' },
    { type: 'square', size: 80, left: 85, top: 30, delay: 0.4, duration: 4, rotate: 135, color: darkMode ? '#8b5cf6' : '#ec4899' },
    { type: 'triangle', size: 120, left: 20, top: 70, delay: 0.6, duration: 5, rotate: 225, color: darkMode ? '#ec4899' : '#3b82f6' },
    { type: 'circle', size: 60, left: 80, top: 60, delay: 0.8, duration: 3.5, rotate: 315, color: darkMode ? '#3b82f6' : '#10b981' },
  ], [darkMode]);

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`} />
        
        {/* Animated Grid */}
        <div className={`absolute inset-0 opacity-30 ${
          darkMode ? 'opacity-10' : 'opacity-30'
        }`}>
          <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-gray-800/[0.2]" />
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute inset-0">
          {shapes.map((shape, index) => (
            <FloatingShape key={index} {...shape} />
          ))}
        </div>
        
        <div className={`absolute inset-0 backdrop-blur-[100px] ${
          darkMode ? 'bg-black/20' : 'bg-white/30'
        }`} />
      </div>  

      <div className="container relative z-10 px-4 mx-auto text-center pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
        >
          <div className="space-y-6">
            <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 dark:bg-black/20 p-8 rounded-2xl shadow-2xl">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {fullName.split('').map((char, index) => (
                  <React.Fragment key={index}>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="inline-block mx-0.5"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                    {char !== ' ' && index < fullName.length - 1 && (
                      <span className="inline-block w-1"></span>
                    )}
                  </React.Fragment>
                ))}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100">
                  {fullSubtitle}
                </span>
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200">
                  {fullDescription}
                </span>
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mt-8"
              >
                <a 
                  href="https://github.com/fariziadam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 transition-all duration-300 border border-white/10 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Github size={18} className="text-gray-700 dark:text-gray-200" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/fariziadam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 transition-all duration-300 border border-white/10 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Linkedin size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">LinkedIn</span>
                </a>
                <a 
                  href="mailto:contact@fariziadam.com" 
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 transition-all duration-300 border border-white/10 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Mail size={18} className="text-red-500 dark:text-red-400" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Email</span>
                </a>
                <a 
                  href="/CV Farizi Adam.pdf" 
                  download="CV Farizi Adam.pdf"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Download size={18} className="text-white" />
                  <span>Download CV</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div> 
      </div>
    </section>
  );
};

export default Hero;