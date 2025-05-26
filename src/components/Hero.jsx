import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

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

  const fullName = "Farizi Adam";
  const fullSubtitle = "Software Engineer | Web Developer";
  const fullDescription = "Creating elegant solutions to complex problems through clean, efficient code.";

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Simple gradient background instead of canvas particles */}
      <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-gray-900 via-gray-800 to-blue-900/80' : 'from-blue-100 via-white to-purple-100'} -z-10`}></div>

      {/* Main content with parallax effect */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {fullName}
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            {fullSubtitle}
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            {fullDescription}
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <a 
              href="https://github.com/fariziadam11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/fariziadam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:contact@fariziadam.com" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a 
              href="/CV Farizi Adam.pdf" 
              download="CV Farizi Adam.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>
      </motion.div> 
    </section>
  );
};

export default Hero;