import React, { useState } from 'react';
import experiences from '../data/experiences';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(experiences[0].id);

  return (
    <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          My professional journey and the companies I've had the pleasure to work with.
        </p>
      </div>

      {/* Mobile View - Accordion Style */}
      <div className="md:hidden">
        {experiences.map((exp) => (
          <div 
            key={exp.id} 
            className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md"
          >
            <div 
              className="p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer flex justify-between items-center"
              onClick={() => setActiveTab(activeTab === exp.id ? null : exp.id)}
            >
              <div>
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <p className="text-blue-500">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</span>
            </div>
            
            {activeTab === exp.id && (
              <div className="p-4 bg-white dark:bg-gray-900">
                <p className="mb-4 text-gray-600 dark:text-gray-300">{exp.description}</p>
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
                  {exp.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View - Tab Style */}
      <div className="hidden md:grid md:grid-cols-12 gap-8">
        {/* Tab Navigation */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-24">
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`p-4 mb-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTab === exp.id 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <h3 className="font-bold">{exp.company}</h3>
                <p className={`text-sm ${activeTab === exp.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {exp.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="md:col-span-8 lg:col-span-9">
          {experiences.map((exp) => (
            activeTab === exp.id && (
              <div 
                key={exp.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                <p className="text-blue-500 mb-4">{exp.company}</p>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{exp.description}</p>
                
                <h4 className="font-semibold text-lg mb-3">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  {exp.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-lg mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
