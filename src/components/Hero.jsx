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
  const [mouse, setMouse] = useState({ x: null, y: null });
  const [enableTypingSound] = useState(false); // Set to true to enable typing sound
  const typingAudioRef = useRef(null);

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
      // Animate gradient wave overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, darkMode ? '#2563eb44' : '#2563eb22');
      gradient.addColorStop(1, darkMode ? '#a78bfa44' : '#a78bfa22');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${darkMode ? '255, 255, 255' : '37, 99, 235'}, ${particle.alpha})`;
        ctx.fill();

        // Interactive: move slightly toward mouse position if present
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            particle.x += dx * 0.01 * (1 - dist/120);
            particle.y += dy * 0.01 * (1 - dist/120);
          }
        }

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

    // Mouse interactivity
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length) {
        setMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    const handleMouseLeave = () => setMouse({ x: null, y: null });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [darkMode, mouse]);

  // Typing animation effect
  useEffect(() => {
    let nameIndex = 0;
    let subtitleIndex = 0;
    let descriptionIndex = 0;
    let isMounted = true;

    const cursorInterval = setInterval(() => {
      if (isMounted) setShowCursor(prev => !prev);
    }, 500);

    const playTypingSound = () => {
      if (enableTypingSound && typingAudioRef.current) {
        typingAudioRef.current.currentTime = 0;
        typingAudioRef.current.play();
      }
    };

    const typeTexts = () => {
      if (isMounted) {
        if (nameIndex <= fullName.length) {
          setTypedName(fullName.slice(0, nameIndex));
          nameIndex++;
          playTypingSound();
          setTimeout(typeTexts, Math.random() * 50 + 30);
          return;
        }

        if (subtitleIndex <= fullSubtitle.length) {
          setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
          subtitleIndex++;
          playTypingSound();
          setTimeout(typeTexts, Math.random() * 40 + 20);
          return;
        }

        if (descriptionIndex <= fullDescription.length) {
          setTypedDescription(fullDescription.slice(0, descriptionIndex));
          descriptionIndex++;
          playTypingSound();
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
  }, [enableTypingSound]);

  // Function to draw signature on canvas
  const drawSignature = (ctx, darkMode) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Set signature style
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = darkMode ? '#3b82f6' : '#2563eb';
    
    // Get canvas dimensions
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Calculate signature positioning
    const startX = width * 0.2;
    const midX = width * 0.5;
    const endX = width * 0.8;
    const baseY = height * 0.5;
    
    // Draw signature (stylized "FA" for Farizi Adam)
    ctx.beginPath();
    
    // Draw the "F" part
    ctx.moveTo(startX, baseY - height * 0.3);
    ctx.lineTo(startX, baseY + height * 0.3);
    ctx.moveTo(startX, baseY - height * 0.2);
    ctx.lineTo(midX - width * 0.1, baseY - height * 0.2);
    ctx.moveTo(startX, baseY);
    ctx.lineTo(midX - width * 0.15, baseY);
    
    // Draw the "A" part
    ctx.moveTo(midX, baseY + height * 0.3);
    ctx.lineTo(midX + width * 0.15, baseY - height * 0.3);
    ctx.lineTo(midX + width * 0.3, baseY + height * 0.3);
    ctx.moveTo(midX + width * 0.075, baseY);
    ctx.lineTo(midX + width * 0.225, baseY);
    
    // Apply a decorative flourish
    ctx.moveTo(startX, baseY + height * 0.3);
    ctx.bezierCurveTo(
      midX, baseY + height * 0.4,
      midX + width * 0.2, baseY + height * 0.2,
      endX, baseY + height * 0.1
    );
    
    ctx.stroke();
    
    // Add subtle background glow
    const glow = ctx.createRadialGradient(
      midX, baseY, 0,
      midX, baseY, width * 0.5
    );
    glow.addColorStop(0, darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)');
    glow.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  };

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
      aria-label="Hero Section"
      tabIndex={-1}
    >
      {/* Particle background */}
      <canvas 
        ref={particlesRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Typing sound effect (hidden audio) */}
      {enableTypingSound && (
        <audio ref={typingAudioRef} src="/sounds/typing.mp3" preload="auto" style={{ display: 'none' }} />
      )}

      <motion.div 
        className="container mx-auto flex flex-col lg:flex-row items-center justify-center relative z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 mb-12 lg:mb-0 px-4 sm:px-6"
          aria-label="Hero Info"
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
                  tabIndex={0}
                  aria-label="Contact Me"
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
          {/* Signature Canvas with 3D Card Effect */}
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
            {/* Gradient background for signature */}
            <div 
              className="absolute inset-0" 
              style={{
                background: darkMode 
                  ? 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' 
                  : 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)'
              }}
            />
            
            {/* Signature canvas */}
            <motion.canvas
              className="absolute inset-0 w-full h-full"
              ref={canvasRef => {
                if (canvasRef) {
                  // Set canvas dimensions
                  canvasRef.width = canvasRef.offsetWidth;
                  canvasRef.height = canvasRef.offsetHeight;
                  
                  // Get 2D context and draw signature
                  const ctx = canvasRef.getContext('2d');
                  drawSignature(ctx, darkMode);
                }
              }}
            />

            {/* Digital animated effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
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
            
            {/* Animated particles around signature */}
            <motion.div 
              className="absolute inset-0 z-10 opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [
                      Math.random() * 20 - 10, 
                      Math.random() * 20 - 10, 
                      Math.random() * 20 - 10
                    ],
                    y: [
                      Math.random() * 20 - 10, 
                      Math.random() * 20 - 10, 
                      Math.random() * 20 - 10
                    ],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
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