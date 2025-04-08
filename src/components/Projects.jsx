import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import projectsData from '../data/projects';

const Projects = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPopup, setShowPopup] = useState(false);
  
  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(activeCategory));
  
  const categoryButtons = [
    { name: 'All', value: 'all' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Backend', value: 'backend' },
    { name: 'React', value: 'react' },
    { name: 'API', value: 'api' }
  ];
  
  const handleDemoClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    
    // Auto-hide popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="projects" 
      className="py-16 px-4 dark:bg-gray-900 dark:text-white"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
        
        {/* Popup Message */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg
                ${darkMode ? 'bg-yellow-700 text-white' : 'bg-yellow-100 border border-yellow-400 text-yellow-800'}`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">ℹ️</span>
                <p>This project is temporarily unavailable. Please check back later!</p>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="ml-4 p-1 rounded-full hover:bg-opacity-20 hover:bg-black"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Category Filters */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categoryButtons.map((button) => (
            <motion.button 
              key={button.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(button.value)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === button.value 
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                  : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
              } dark:text-white`}
            >
              {button.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(project => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} dark:bg-gray-800`}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-48 overflow-hidden"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex justify-between">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      onClick={handleDemoClick}
                      className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      Live Demo
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.sourceLink} 
                      className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} dark:bg-gray-700 dark:text-white`}
                    >
                      Source Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Projects;