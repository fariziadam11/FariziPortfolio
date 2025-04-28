import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import skillsData from '../data/skills';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const Skills = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const canvasRef = useRef(null);
  
  // Group skills by category
  const categories = ['all', ...new Set(skillsData.map(skill => skill.category || 'other'))];
  
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  // Particle animation effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width / 20), 50);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          color: darkMode ? '#ffffff' : '#3b82f6',
          alpha: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.3 + 0.1,
          directionX: Math.random() * 0.6 - 0.3,
          directionY: Math.random() * 0.6 - 0.3
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${darkMode ? '255, 255, 255' : '59, 130, 246'}, ${particle.alpha})`;
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

          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${darkMode ? '255, 255, 255' : '59, 130, 246'}, ${0.05 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.3;
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      } 
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      boxShadow: darkMode 
        ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
        : '0 4px 12px rgba(59, 130, 246, 0.3)' 
    },
    tap: { scale: 0.95 }
  };

  // Handle skill click for detailed view
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  // Close detailed skill view
  const closeDetailView = () => {
    setSelectedSkill(null);
  };
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-20 px-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} relative overflow-hidden`}
    >
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 8,
            }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.p 
            className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            variants={headingVariants}
          >
            A collection of technologies I've worked with throughout my journey as a developer
          </motion.p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={categoryVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} cursor-pointer`}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: darkMode 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: darkMode ? '#4f46e5' : '#3b82f6',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSkillClick(skill)}
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className={`text-3xl mr-3 ${skill.iconColor || (darkMode ? 'text-blue-400' : 'text-blue-500')}`}
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {skill.icon}
                  </div>
                  <h3 
                    className="text-xl font-semibold"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {skill.name}
                  </h3>
                </div>
                
                <div className="relative pt-1" style={{ transform: 'translateZ(5px)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                      {skill.level < 60 ? 'Familiar' : skill.level < 75 ? 'Proficient' : skill.level < 90 ? 'Advanced' : 'Expert'}
                    </div>
                    <div className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {skill.level}%
                    </div>
                  </div>
                  <div className={`w-full h-2.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} overflow-hidden`}>
                    <motion.div 
                      className={`h-full rounded-full ${skill.barColor || 'bg-blue-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                
                {skill.description && (
                  <p 
                    className={`mt-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {skill.description}
                  </p>
                )}
                
                <div className="mt-4 text-xs text-right text-blue-500 dark:text-blue-400">
                  Click for details
                </div>
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
              className={`relative max-w-2xl w-full rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
                  <motion.div 
                    className={`h-full rounded-full ${selectedSkill.barColor || 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
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

export default Skills;