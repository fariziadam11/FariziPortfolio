import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import skillsData from '../data/skills';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Helper for glassmorphism
const glass = 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg border border-white/30 dark:border-gray-700/40';


const Skills = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(() => {
    return ['all', ...new Set(skillsData.map(skill => skill.category || 'other'))];
  }, []);
  
  // Memoize filtered skills to prevent recalculation on every render
  const filteredSkills = useMemo(() => {
    return activeCategory === 'all' 
      ? skillsData 
      : skillsData.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  // No particle animation

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const handleSkillClick = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  const closeDetailView = useCallback(() => {
    setSelectedSkill(null);
  }, []);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-20 px-4 min-h-screen relative overflow-hidden flex flex-col justify-center items-center transition-colors duration-700 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white' : 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800'}`}
      style={{
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      {/* Simple gradient background instead of particles */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-30 from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 z-0"></div>

      <div className="container mx-auto relative z-10">
        {/* Section header - simplified */}
        <div className="text-center mb-14 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 inline-block relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Technical Skills
          </h2>
          <p className={`max-w-2xl mx-auto text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
            A collection of technologies I've worked with throughout my journey as a developer
          </p>
        </div>

        {/* Category filters - no animations on mobile */}
        <div 
          className="flex flex-wrap justify-center gap-2 mb-12 px-2"
          {...(!isMobile && {
            as: motion.div,
            variants: categoryVariants,
            initial: "hidden",
            animate: isInView ? "visible" : "hidden"
          })}
          style={{ 
            position: 'relative',
            zIndex: 20
          }}
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                activeCategory === category
                  ? darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105 shadow-xl' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-xl'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
              variants={buttonVariants}
              whileHover={!isMobile ? "hover" : undefined}
              whileTap="tap"
              role="tab"
              aria-selected={activeCategory === category}
              tabIndex={activeCategory === category ? 0 : -1}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className={`group p-6 rounded-2xl ${glass} cursor-pointer transition-transform duration-300 hover:scale-[1.045] hover:shadow-2xl focus:scale-[1.045] focus:shadow-2xl outline-none border-2 border-transparent hover:border-blue-400 focus:border-blue-400 relative overflow-hidden`}
                variants={itemVariants}
                whileHover={!isMobile ? { y: -10, scale: 1.045, boxShadow: '0 12px 32px 0 rgba(59,130,246,0.18)' } : {}}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSkillClick(skill)}
                tabIndex={0}
                role="button"
                aria-label={`Show details for ${skill.name}`}
              >
                {/* Animated gradient border effect */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400 group-focus:border-blue-400 transition-all duration-300"></span>
                <div className="flex items-center mb-4">
                  <div className={`text-4xl mr-3 drop-shadow-lg ${skill.iconColor || (darkMode ? 'text-blue-400' : 'text-blue-500')}`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">
                    {skill.name}
                  </h3>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full tracking-widest shadow-sm ${darkMode ? 'bg-blue-900/60 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                      {skill.level < 60 ? 'Familiar' : skill.level < 75 ? 'Proficient' : skill.level < 90 ? 'Advanced' : 'Expert'}
                    </div>
                    <div className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {skill.level}%
                    </div>
                  </div>
                  <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-200/60'} overflow-hidden shadow-inner`}>
                    <div 
                      className={`h-full rounded-full ${skill.barColor || 'bg-gradient-to-r from-blue-400 to-purple-500'} shadow-lg`}
                      style={{width: `${skill.level}%`, minWidth: 8}}
                    />
                  </div>
                </div>
                
                {skill.description && (
                  <p className={`mt-4 text-sm leading-relaxed ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                    {skill.description}
                  </p>
                )}
                {!isMobile && (
                  <div className="mt-4 text-xs text-right text-blue-500 dark:text-blue-400 animate-pulse">
                    Click for details
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detailed skill view modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetailView}
          >
            <motion.div 
              className={`relative max-w-2xl w-full rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl mx-2`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={`absolute top-3 right-3 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={closeDetailView}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="flex items-center mb-6">
                <div className={`text-4xl mr-4 ${selectedSkill.iconColor || (darkMode ? 'text-blue-400' : 'text-blue-500')}`}>
                  {selectedSkill.icon}
                </div>
                <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-medium">Proficiency Level</div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {selectedSkill.level}%
                  </div>
                </div>
                <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                  <div 
                    className={`h-full rounded-full ${selectedSkill.barColor || 'bg-blue-500'}`}
                    style={{ width: `${selectedSkill.level}%` }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-600 bg-opacity-20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                    {selectedSkill.level < 60 ? 'Familiar' : selectedSkill.level < 75 ? 'Proficient' : selectedSkill.level < 90 ? 'Advanced' : 'Expert'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedSkill.description || "No detailed description available."}
                </p>
              </div>

              {selectedSkill.projects && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Projects Using This Skill</h4>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {selectedSkill.projects.map((project, index) => (
                      <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSkill.relatedSkills && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Related Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.relatedSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(Skills);