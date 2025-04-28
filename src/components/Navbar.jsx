import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  
  // Scroll progress for transparency effect
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    [
      darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'
    ]
  );
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );
  
  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check initial load
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e, targetId) => {
    // Prevent default behavior
    e.preventDefault();
    
    // Mobile-specific handling
    if (isMobile) {
      setMobileMenuOpen(false);
      
      setTimeout(() => {
        navigateToSection(targetId);
      }, 300);
    } else {
      // Desktop - immediate navigation
      navigateToSection(targetId);
    }
  };

  const navigateToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    } else {
      console.error('Target section not found:', targetId);
      window.location.hash = targetId;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  // Variants for animations
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      ref={navRef}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        backgroundColor: navBackground,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur
      }}
      className="fixed w-full z-20 border-b border-gray-200 dark:border-gray-800 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.a 
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            onClick={(e) => handleNavigation(e, 'home')}
          >
            <span className="flex items-center">
              <span className="relative">
                <span className="absolute -inset-1 -z-10 rounded-full bg-blue-500/20 blur-sm"></span>
                FA
              </span>
              <span className="ml-1 text-gray-800 dark:text-white">Portfolio</span>
            </span>
          </motion.a>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.id}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                href={link.href}
                onClick={(e) => handleNavigation(e, link.id)}
                className={`relative group transition-colors duration-300 ${
                  activeSection === link.id 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
                <motion.span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform origin-left ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                  } group-hover:scale-x-100 transition-transform duration-300`}
                />
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-2 py-2 space-y-2 overflow-hidden"
            >
              {navLinks.map((link) => (
                <motion.a 
                  key={link.id}
                  variants={mobileNavItemVariants}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md ${
                    activeSection === link.id
                      ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className={activeSection === link.id ? 'text-blue-500 dark:text-blue-400' : ''} />
                </motion.a>
              ))}
              <div className="px-3 py-2 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${
                    darkMode 
                      ? 'bg-gray-700 text-yellow-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;