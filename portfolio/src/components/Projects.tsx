import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Project One",
      description: "A modern web application built with React and TypeScript",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/username/project-one",
      liveUrl: "https://project-one.com",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Project Two",
      description: "An innovative mobile-first solution for productivity",
      technologies: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/username/project-two",
      liveUrl: "https://project-two.com",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const imageHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        My Projects
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            variants={item}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              className="overflow-hidden"
              variants={imageHover}
            >
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
                variants={imageHover}
              />
            </motion.div>
            <div className="p-6">
              <motion.h3 
                className="text-2xl font-semibold mb-2"
                variants={{
                  hover: { scale: 1.05, originX: 0 }
                }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-4"
                variants={{
                  hover: { y: -2 }
                }}
              >
                {project.description}
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={{
                  hover: { y: -2 }
                }}
              >
                {project.technologies.map((tech, techIndex) => (
                  <motion.span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "var(--primary-100)",
                      color: "var(--primary-600)"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div 
                className="flex gap-4"
                variants={{
                  hover: { y: -2 }
                }}
              >
                <motion.a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    x: 2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  <span>Code</span>
                </motion.a>
                <motion.a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    x: 2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;