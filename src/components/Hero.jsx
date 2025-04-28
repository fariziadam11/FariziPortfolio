import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const { darkMode } = useTheme();
  const [typingComplete, setTypingComplete] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

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

  // Particle animation effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: darkMode ? '#ffffff' : '#2563eb',
          alpha: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.5 + 0.1,
          directionX: Math.random() * 1 - 0.5,
          directionY: Math.random() * 1 - 0.5
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${darkMode ? '255, 255, 255' : '37, 99, 235'}, ${particle.alpha})`;
        ctx.fill();

        // Update position
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.directionX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.directionY *= -1;
      });

      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${darkMode ? '255, 255, 255' : '37, 99, 235'}, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // Typing animation effect
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
          setTimeout(typeTexts, Math.random() * 50 + 30); // Randomize typing speed for more natural effect
          return;
        }

        if (subtitleIndex <= fullSubtitle.length) {
          setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
          subtitleIndex++;
          setTimeout(typeTexts, Math.random() * 40 + 20);
          return;
        }

        if (descriptionIndex <= fullDescription.length) {
          setTypedDescription(fullDescription.slice(0, descriptionIndex));
          descriptionIndex++;
          setTimeout(typeTexts, Math.random() * 30 + 15);
          return;
        }

        if (nameIndex > fullName.length && 
            subtitleIndex > fullSubtitle.length && 
            descriptionIndex > fullDescription.length) {
          setTypingComplete(true);
          setTimeout(() => setShowScrollHint(true), 1000);
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
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="home" 
      className="relative min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 px-4 dark:bg-gray-900 dark:text-white overflow-hidden"
      style={{ 
        perspective: '1000px'
      }}
    >
      {/* Particle background */}
      <canvas 
        ref={particlesRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <motion.div 
        className="container mx-auto flex flex-col lg:flex-row items-center justify-center relative z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 mb-12 lg:mb-0 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <div className="text-xs sm:text-sm font-medium text-blue-500 dark:text-blue-400 mb-2 tracking-wider">
              WELCOME TO MY PORTFOLIO
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 min-h-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
            {typedName}
            {showCursor && typedName.length < fullName.length && <span className="text-black dark:text-white animate-pulse">|</span>}
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 min-h-10">
            {typedSubtitle}
            {showCursor && typedName.length === fullName.length && 
             typedSubtitle.length < fullSubtitle.length && 
             <span className="animate-pulse">|</span>}
          </h2>

          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-md min-h-20 sm:min-h-24 text-gray-600 dark:text-gray-400">
            {typedDescription}
            {showCursor && typedName.length === fullName.length && 
             typedSubtitle.length === fullSubtitle.length && 
             typedDescription.length < fullDescription.length && 
             <span className="animate-pulse">|</span>}
          </p>

          <AnimatePresence>
            {typingComplete && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all`}
                >
                  <Mail size={16} className="sm:block" />
                  <span>Hire Me</span>
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects" 
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-200'} transition-all dark:text-white shadow-sm`}
                >
                  View Work
                </motion.a>

                <motion.div className="flex gap-2 sm:gap-3 mt-4 md:mt-6 w-full">
                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/fariziadam11" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                    aria-label="GitHub"
                  >
                    <Github size={18} className="sm:hidden" />
                    <Github size={20} className="hidden sm:block" />
                  </motion.a>

                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://linkedin.com/in/fariziadam" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="sm:hidden" />
                    <Linkedin size={20} className="hidden sm:block" />
                  </motion.a>

                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="/resume.pdf" 
                    download
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                    aria-label="Download Resume"
                  >
                    <Download size={18} className="sm:hidden" />
                    <Download size={20} className="hidden sm:block" />
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center px-4"
        >
          {/* 3D Card Effect */}
          <motion.div 
            whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden group shadow-2xl"
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: darkMode 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px 0 rgba(59, 130, 246, 0.2)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px 0 rgba(59, 130, 246, 0.1)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <img 
              src="/images/farizi.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />

            {/* Glowing border effect */}
            <motion.div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ 
                background: `linear-gradient(45deg, ${darkMode ? '#3b82f680' : '#3b82f640'}, transparent, ${darkMode ? '#8b5cf680' : '#8b5cf640'})`,
                backgroundSize: '200% 200%',
                opacity: 0,
                zIndex: 20
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <motion.p 
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Scroll Down
            </motion.p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="text-blue-500 dark:text-blue-400" size={18} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Hero;