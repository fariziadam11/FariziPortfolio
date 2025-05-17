import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import projectsData from '../data/projects';
import { ExternalLink, Code, X, Maximize2 } from 'lucide-react';

const Projects = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);
  
  // Memoize filtered projects to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return activeCategory === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.categories.includes(activeCategory));
  }, [activeCategory]);
  
  const categoryButtons = [
    { name: 'All', value: 'all' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Backend', value: 'backend' },
    { name: 'React', value: 'react' },
    { name: 'API', value: 'api' }
  ];
  
  // Memoize event handlers with useCallback
  const handleDemoClick = useCallback((e, project) => {
    e.preventDefault();
    setShowPopup(true);
    
    // Auto-hide popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }, []);
  
  const openProjectModal = useCallback((project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }, []);
  
  const closeProjectModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }, []);
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
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
        stiffness: 300,
        damping: 24,
        duration: 0.4
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };
  


  return (
    <section 
      ref={containerRef}
      id="projects" 
      className={`py-20 px-4 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/80 text-white' : 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800'}`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div 
          className="text-center mb-16"
          role="region"
          aria-labelledby="projects-heading"
        >
          <span 
            className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-4"
          >
            My Work
          </span>
          <h2 id="projects-heading" className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore my latest work and the technologies I've been using
          </p>
        </div>
        
        {/* Popup Message */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg
                ${darkMode ? 'bg-yellow-700 text-white' : 'bg-yellow-100 border border-yellow-400 text-yellow-800'}`}
              drag
              dragConstraints={{ left: -100, right: 100, top: 0, bottom: 50 }}
              dragElastic={0.2}
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">ℹ️</span>
                <p>This project is temporarily unavailable. Please check back later!</p>
                <motion.button 
                  onClick={() => setShowPopup(false)}
                  className="ml-4 p-1 rounded-full"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Category Filters */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Project Categories"
        >
          {categoryButtons.map((button, i) => (
            <motion.button 
              key={button.value}
              custom={i}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveCategory(button.value)}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeCategory === button.value 
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                  : (darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-200')
              }`}
              role="tab"
              aria-selected={activeCategory === button.value}
              tabIndex={activeCategory === button.value ? 0 : -1}
            >
              {button.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={activeCategory} // Key changes trigger animation
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                custom={i}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  delay: i * 0.05 // Stagger based on index
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: darkMode 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} group`}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title + ' project screenshot'} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={() => openProjectModal(project)}
                      className="m-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                    >
                      <Maximize2 size={18} />
                    </motion.button>
                  </div>
                  
                  {/* Tech tags */}
                  <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
                    {project.stack && project.stack.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm text-white rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack && project.stack.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm text-white rounded-md">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                        Featured
                      </span>
                    )}
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">{project.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <motion.a 
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      onClick={(e) => handleDemoClick(e, project)}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                      aria-label={`Open live demo for ${project.title}`}
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.sourceLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Code size={14} />
                      <span>Source</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Project Detail Modal */}
        <AnimatePresence>
          {showModal && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
              onClick={closeProjectModal}
              onKeyDown={e => { if (e.key === 'Escape') closeProjectModal(); }}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`relative max-w-4xl w-full rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
                onClick={e => e.stopPropagation()}
                tabIndex={0}
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.1}
              >
                <motion.button
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white"
                  onClick={closeProjectModal}
                  whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.button>
                
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                      {selectedProject.year && (
                        <p className="text-white/80">{selectedProject.year}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack && selectedProject.stack.map((tech, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                            darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                  
                  {selectedProject.features && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDemoClick(e, selectedProject);
                      }}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      <ExternalLink size={16} />
                      <span>View Live Demo</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.sourceLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} dark:text-white`}
                    >
                      <Code size={16} />
                      <span>View Source Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(Projects);