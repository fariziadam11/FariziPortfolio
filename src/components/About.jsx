import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { darkMode } = useTheme();
  
  return (
    <section id="about" className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Who I am</h3>
            <p className="mb-4">
              I'm a passionate software engineer specializing in web development with over 5 years of experience building 
              production-ready applications. I enjoy solving complex problems and turning ideas into reality through code.
            </p>
            <p className="mb-4">
              My journey began with PHP and Laravel, but I've since expanded my skill set to include modern JavaScript 
              frameworks like React. I believe in writing clean, maintainable code that follows best practices and design patterns.
            </p>
            <p>
              When I'm not coding, you'll find me hiking, reading tech blogs, or contributing to open-source projects.
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-medium mb-1">Full-Stack Development</h4>
                <p className="text-sm">Building end-to-end web solutions</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                <div className="text-2xl mb-2">🚀</div>
                <h4 className="font-medium mb-1">Performance Optimization</h4>
                <p className="text-sm">Crafting fast, responsive applications</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-medium mb-1">Security Implementation</h4>
                <p className="text-sm">Building with security best practices</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-medium mb-1">Responsive Design</h4>
                <p className="text-sm">Creating fluid, adaptable interfaces</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;