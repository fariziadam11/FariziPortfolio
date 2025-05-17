import React from 'react';
import { Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Portfolio
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
              <Linkedin size={20} />
            </a>
            <a href="mailto:your.email@example.com" className="hover:text-primary-600 dark:hover:text-primary-400">
              <Mail size={20} />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}