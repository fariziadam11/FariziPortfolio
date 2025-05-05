import React, { useRef, useState, useEffect } from 'react';

import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Code, Zap, ShieldCheck, Smartphone, ChevronRight, Github, Coffee, BookOpen } from 'lucide-react';

const About = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const svgBgRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [mouse, setMouse] = useState({ x: null, y: null });

  // Parallax effect for background elements
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });

  // const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Animate SVG background on mouse move
  useEffect(() => {
    const svg = svgBgRef.current;
    if (!svg) return;
    const handleMove = (e) => {
      let x, y;
      if (e.touches && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      setMouse({ x, y });
    };
    svg.addEventListener('mousemove', handleMove);
    svg.addEventListener('touchmove', handleMove);
    return () => {
      svg.removeEventListener('mousemove', handleMove);
      svg.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const competencies = [
    {
      icon: <Code size={24} className="text-blue-500" />,
      title: "Full-Stack Development",
      description: "Building end-to-end web solutions",
      details: "Proficient in both frontend and backend technologies, creating seamless user experiences with optimized server-side logic."
    },
    {
      icon: <Zap size={24} className="text-yellow-500" />,
      title: "Performance Optimization",
      description: "Crafting fast, responsive applications",
      details: "Implementing advanced caching strategies, code splitting, and resource optimization to deliver lightning-fast applications."
    },
    {
      icon: <ShieldCheck size={24} className="text-green-500" />,
      title: "Security Implementation",
      description: "Building with security best practices",
      details: "Implementing robust authentication systems, data encryption, and protection against common vulnerabilities like XSS and CSRF."
    },
    {
      icon: <Smartphone size={24} className="text-purple-500" />,
      title: "Responsive Design",
      description: "Creating fluid, adaptable interfaces",
      details: "Designing interfaces that provide optimal viewing experience across a wide range of devices with fluid layouts and responsive components."
    }
  ];

  const personalFacts = [
    { icon: <Github size={20} />, text: "Open source contributor" },
    { icon: <Coffee size={20} />, text: "Coffee enthusiast" },
    { icon: <BookOpen size={20} />, text: "Avid tech reader" }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className={`relative py-20 px-4 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/80 text-white' : 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800'}`}
      aria-label="About Section"
      tabIndex={-1}
    >
      {/* Interactive SVG background */}
      <svg
        ref={svgBgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1440 600"
        className="absolute inset-0 w-full h-full -z-10"
        aria-hidden="true"
        style={{ pointerEvents: 'auto' }}
      >
        <defs>
          <radialGradient id="about-bg-gradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor={darkMode ? '#6366f1' : '#3b82f6'} stopOpacity="0.30" />
            <stop offset="100%" stopColor={darkMode ? '#a78bfa' : '#818cf8'} stopOpacity="0.10" />
          </radialGradient>
        </defs>
        <ellipse
          cx={mouse.x ? mouse.x : 720}
          cy={mouse.y ? mouse.y : 300}
          rx={320}
          ry={180}
          fill="url(#about-bg-gradient)"
        />
        <ellipse
          cx={mouse.x ? mouse.x + 220 : 940}
          cy={mouse.y ? mouse.y + 80 : 380}
          rx={180}
          ry={80}
          fill={darkMode ? '#a78bfa55' : '#6366f155'}
        />
      </svg>

      <div className="container mx-auto max-w-6xl" aria-label="About Content">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get to Know Me Better
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Passionate software engineer with a knack for creating elegant solutions to complex problems
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-10"
        >
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                  <span className="text-blue-600 dark:text-blue-300">👨‍💻</span>
                </span>
                My Journey
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-800"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 -translate-x-1.5"></div>
                  <h4 className="text-lg font-semibold mb-1">Who I am</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    I'm a passionate software engineer specializing in web development with over 5 years of experience building 
                    production-ready applications. I enjoy solving complex problems and turning ideas into reality through code.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-800"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 -translate-x-1.5"></div>
                  <h4 className="text-lg font-semibold mb-1">My Expertise</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    My journey began with PHP and Laravel, but I've since expanded my skill set to include modern JavaScript 
                    frameworks like React. I believe in writing clean, maintainable code that follows best practices and design patterns.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 -translate-x-1.5"></div>
                  <h4 className="text-lg font-semibold mb-1">Beyond Coding</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    When I'm not coding, you'll find me hiking, reading tech blogs, or contributing to open-source projects.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                    {personalFacts.map((fact, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {fact.icon}
                        <span>{fact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mt-8"
              >
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  <span>Let's work together</span>
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                <span className="text-purple-600 dark:text-purple-300">🚀</span>
              </span>
              Core Competencies
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {competencies.map((competency, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: darkMode 
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                      : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className={`p-6 rounded-xl shadow-lg transition-all duration-300
                    ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      {competency.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{competency.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{competency.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{competency.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;