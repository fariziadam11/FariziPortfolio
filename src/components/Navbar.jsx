import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname.substring(1) || 'hero');

  // Simpler scroll handling with standard JavaScript
  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(Math.min(window.scrollY / 100, 1));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background styles based on scroll progress
  const getNavStyles = () => {
    const bgOpacity = 0.5 + (scrollProgress * 0.45);
    const blurAmount = scrollProgress * 10;

    return {
      backgroundColor: darkMode 
        ? `rgba(17, 24, 39, ${bgOpacity})` 
        : `rgba(255, 255, 255, ${bgOpacity})`,
      backdropFilter: `blur(${blurAmount}px)`,
      WebkitBackdropFilter: `blur(${blurAmount}px)`,
      position: 'fixed',
      width: '100%',
      zIndex: 20,
      borderBottomWidth: '1px',
      borderBottomColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(229, 231, 235)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };
  };

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Close mobile menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
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
    e.preventDefault();
    
    // For mobile, close menu first then navigate
    if (isMobile && mobileMenuOpen) {
      // Close menu immediately
      setMobileMenuOpen(false);
      
      // Small delay to let menu close visually before navigating
      setTimeout(() => {
        navigate(`/${targetId}`);
      }, 100);
    } else {
      // Desktop - immediate navigation
      navigate(`/${targetId}`);
    }
  };

  // Fungsi navigateToSection tidak dibutuhkan lagi karena kita menggunakan react-router

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: '/hero', label: 'Home', id: 'hero' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/experience', label: 'Experience', id: 'experience' },
    { href: '/projects', label: 'Projects', id: 'projects' },
    { href: '/skills', label: 'Skills', id: 'skills' },
    { href: '/contact', label: 'Contact', id: 'contact' }
  ];

  // Minimal animation variants
  const navItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  // Simplified mobile menu animation
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0
    },
    open: { 
      opacity: 1,
      height: 'auto'
    }
  };

  return (
    <nav 
      ref={navRef}
      style={getNavStyles()}
      className="transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/hero"
            className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            <span className="flex items-center">
              <span className="relative">
                <span className="absolute -inset-1 -z-10 rounded-full bg-blue-500/20 blur-sm"></span>
                FA
              </span>
              <span className="ml-1 text-gray-800 dark:text-white">Portfolio</span>
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none text-gray-800 dark:text-gray-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <motion.div 
                key={link.id}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link 
                  to={link.href}
                  className={`block relative group transition-colors duration-300 ${
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
                </Link>
              </motion.div>
            ))}
            <motion.div className="relative">
              <motion.button 
                onClick={(e) => {
                  e.persist();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  
                  toggleDarkMode({
                    clientX: centerX,
                    clientY: centerY
                  });
                }}
                className={`relative p-2 rounded-full z-10 ${
                  darkMode 
                    ? 'bg-gray-800 text-amber-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-indigo-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <motion.span
                  key={darkMode ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: darkMode ? 90 : -90 }}
                  animate={{ 
                    opacity: 1, 
                    rotate: 0,
                    transition: { 
                      type: 'spring', 
                      stiffness: 500, 
                      damping: 20 
                    } 
                  }}
                  className="block relative z-10"
                >
                  {darkMode ? (
                    <Sun size={20} className="text-amber-300" />
                  ) : (
                    <Moon size={20} className="text-indigo-700" />
                  )}
                </motion.span>
              </motion.button>
              
              {/* Water droplet effect container */}
              <motion.span 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0,0,0,0) 70%)',
                  filter: 'blur(4px)',
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: 'center',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.8, 1.5, 2],
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeOut',
                  repeat: 0,
                  delay: 0.1
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Simplified Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-2 py-2 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <div key={link.id}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.id)}
                    className={`block px-3 py-2 rounded-md ${
                      activeSection === link.id
                        ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      <ChevronRight size={16} className={activeSection === link.id ? 'text-blue-500 dark:text-blue-400' : ''} />
                    </div>
                  </a>
                </div>
              ))}
              <div className="px-3 py-2 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
                <div className="relative">
                  <motion.button 
                    onClick={(e) => {
                      e.persist();
                      const rect = e.currentTarget.getBoundingClientRect();
                      const centerX = rect.left + rect.width / 2;
                      const centerY = rect.top + rect.height / 2;
                      
                      toggleDarkMode({
                        clientX: centerX,
                        clientY: centerY
                      });
                    }}
                    className={`relative p-2 rounded-full z-10 ${
                      darkMode 
                        ? 'bg-gray-800 text-amber-300' 
                        : 'bg-gray-100 text-indigo-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <motion.span
                      key={darkMode ? 'sun-mobile' : 'moon-mobile'}
                      initial={{ opacity: 0, rotate: darkMode ? 90 : -90 }}
                      animate={{ 
                        opacity: 1, 
                        rotate: 0,
                        transition: { 
                          type: 'spring', 
                          stiffness: 500, 
                          damping: 20 
                        } 
                      }}
                      className="block relative z-10"
                    >
                      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.span>
                  </motion.button>
                  
                  {/* Water droplet effect container */}
                  <motion.span 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0,0,0,0) 70%)',
                      filter: 'blur(4px)',
                      opacity: 0,
                      scale: 0.8,
                      transformOrigin: 'center',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [0.8, 1.5, 2],
                    }}
                    transition={{
                      duration: 1.2,
                      ease: 'easeOut',
                      repeat: 0,
                      delay: 0.1
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;