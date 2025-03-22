import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import projectsData from '../data/projects';

const Projects = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(activeCategory));
  
  return (
    <section id="projects" className="py-16 px-4 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'all' 
              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} dark:text-white`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveCategory('frontend')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'frontend' 
              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} dark:text-white`}
          >
            Frontend
          </button>
          <button 
            onClick={() => setActiveCategory('backend')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'backend' 
              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} dark:text-white`}
          >
            Backend
          </button>
          <button 
            onClick={() => setActiveCategory('react')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'react' 
              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} dark:text-white`}
          >
            React
          </button>
          <button 
            onClick={() => setActiveCategory('api')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'api' 
              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} dark:text-white`}
          >
            API
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} dark:bg-gray-800`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <div className="flex justify-between">
                  <a 
                    href={project.demoLink} 
                    className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.sourceLink} 
                    className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} dark:bg-gray-700 dark:text-white`}
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;