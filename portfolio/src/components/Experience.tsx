import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      duration: "Jan 2022 - Present",
      location: "San Francisco, CA",
      description: [
        "Led a team of 5 developers in building responsive web applications using React and TypeScript",
        "Implemented CI/CD pipelines that reduced deployment time by 40%",
        "Optimized application performance resulting in 30% faster load times"
      ],
      technologies: ["React", "TypeScript", "Redux", "Tailwind CSS", "Jest"]
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      duration: "Mar 2019 - Dec 2021",
      location: "Boston, MA",
      description: [
        "Developed and maintained multiple web applications with React frontend and Node.js backend",
        "Created RESTful APIs that handled over 1M requests per day",
        "Collaborated with UX designers to implement responsive designs"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"]
    },
    {
      company: "WebCraft Studios",
      position: "Junior Web Developer",
      duration: "Jun 2017 - Feb 2019",
      location: "Chicago, IL",
      description: [
        "Built and maintained client websites using modern JavaScript frameworks",
        "Implemented responsive designs ensuring cross-browser compatibility",
        "Participated in code reviews and contributed to team knowledge sharing"
      ],
      technologies: ["JavaScript", "HTML/CSS", "jQuery", "PHP", "WordPress"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="mb-12 relative pl-8 md:pl-0"
              variants={itemVariants}
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:ml-0.5"></div>
              )}
              
              <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center md:relative md:left-auto md:top-auto md:col-span-1 md:justify-end">
                  <div className="w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                </div>
                
                {/* Left side - Company & Duration (on desktop) */}
                <div className="hidden md:block md:text-right md:pr-8 md:col-span-2">
                  <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{exp.company}</h3>
                  <div className="flex items-center justify-end mt-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="mr-1" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center justify-end mt-1 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="mr-1" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                
                {/* Right side - Position & Description */}
                <div className="md:col-span-2 md:pl-8">
                  {/* Mobile only - Company & Duration */}
                  <div className="md:hidden">
                    <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{exp.company}</h3>
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} className="mr-1" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mt-3 md:mt-0">{exp.position}</h4>
                  <ul className="mt-3 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
