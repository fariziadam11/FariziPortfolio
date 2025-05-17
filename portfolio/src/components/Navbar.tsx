import { Sun, Moon, Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const navbarHeight = 100; // Approximate offset for detection
      
      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the section is in the viewport (with offset for navbar)
          if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      // If we're at the top of the page, set home as active
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    // Run once on mount to set initial active section
    handleScroll();
    
    // Add throttling to improve performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-md' 
          : 'bg-white/70 dark:bg-gray-900/70'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-2xl font-bold text-primary-600 dark:text-primary-400"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.a>
          
          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={navVariants}
          >
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <motion.a 
                key={section}
                href={`#${section}`}
                onClick={(e) => scrollToSection(e, section)}
                className={`transition-colors relative ${
                  activeSection === section 
                    ? 'text-primary-600 dark:text-primary-400 font-medium' 
                    : 'hover:text-primary-600 dark:hover:text-primary-400'
                }`}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"
                    layoutId="activeSection"
                  />
                )}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={navVariants}
          >
            <motion.a 
              href="/CV Farizi Adam.pdf" 
              download
              className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white dark:bg-primary-500 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>CV</span>
            </motion.a>
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary-600 dark:hover:text-primary-400"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary-600 dark:hover:text-primary-400"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="mailto:your.email@example.com" 
              className="hover:text-primary-600 dark:hover:text-primary-400"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <Mail size={20} />
            </motion.a>
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              variants={itemVariants}
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col space-y-4">
                {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                  <motion.a 
                    key={section}
                    href={`#${section}`}
                    onClick={(e) => {
                      scrollToSection(e, section);
                      setIsMenuOpen(false);
                    }}
                    className={`transition-colors ${
                      activeSection === section 
                        ? 'text-primary-600 dark:text-primary-400 font-medium' 
                        : 'hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                ))}
                <motion.a 
                  href="/CV Farizi Adam.pdf" 
                  download
                  className="flex items-center gap-1 w-fit mt-2 px-3 py-1.5 bg-primary-600 text-white dark:bg-primary-500 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </motion.a>
                <div className="flex items-center space-x-4 pt-4">
                  <motion.a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href="mailto:your.email@example.com" 
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                  >
                    <Mail size={20} />
                  </motion.a>
                  <motion.button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    variants={itemVariants}
                    whileHover={{ rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}