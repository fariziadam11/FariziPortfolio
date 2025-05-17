import { Code2, Globe, Database, Github } from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: <Code2 size={24} />,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with React, TypeScript, and Tailwind CSS.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Backend Development',
      description: 'Building robust server-side applications using PHP, Laravel, and FastAPI.',
    },
    {
      icon: <Database size={24} />,
      title: 'Database Management',
      description: 'Designing and optimizing database structures with MySQL and PostgreSQL.',
    },
    {
      icon: <Github size={24} />,
      title: 'Version Control',
      description: 'Managing code versions and collaborating with teams using Git and GitHub.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            I'm a passionate software engineer with expertise in both frontend and backend development.
            With years of experience in web development, I specialize in creating scalable and
            maintainable applications that solve real-world problems.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}