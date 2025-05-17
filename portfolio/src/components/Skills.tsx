import React from 'react';
import { Code2, Server, Database, Github as Git, Globe, Terminal } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code2 size={24} />,
      skills: [
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "React", level: 88 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server size={24} />,
      skills: [
        { name: "PHP", level: 82 },
        { name: "Laravel", level: 80 },
        { name: "FastAPI", level: 75 },
        { name: "Node.js", level: 78 }
      ]
    },
    {
      title: "Database",
      icon: <Database size={24} />,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 }
      ]
    },
    {
      title: "Other Tools",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Git", level: 88 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 dark:bg-primary-400 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;