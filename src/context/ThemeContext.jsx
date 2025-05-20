import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [ripple, setRipple] = useState(null);

  // Handle theme change with water ripple effect
  const toggleDarkMode = useCallback((event) => {
    const { clientX, clientY } = event || {};
    
    // Set ripple position if coordinates are provided (from click event)
    if (clientX && clientY) {
      setRipple({
        x: clientX,
        y: clientY,
        id: Date.now()
      });
    }

    // Add theme-changing class to body for wave effect
    document.body.classList.add('theme-changing');
    
    // Toggle theme after a small delay to allow ripple animation to start
    setTimeout(() => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      
      // Toggle dark class on html element
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Remove the theme-changing class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-changing');
      }, 1500);
      
    }, 100);
  }, [darkMode]);

  // Initial theme setup
  useEffect(() => {
    // Check saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldEnableDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldEnableDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Add CSS for the water ripple effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes water-ripple {
        0% {
          transform: scale(0);
          opacity: 0.6;
          border-radius: 50%;
        }
        20% {
          opacity: 0.4;
          border-radius: 45% 55% 40% 60% / 55% 45% 55% 45%;
        }
        40% {
          opacity: 0.3;
          border-radius: 50% 50% 45% 55% / 50% 50% 50% 50%;
        }
        60% {
          opacity: 0.2;
          border-radius: 55% 45% 50% 50% / 45% 55% 45% 55%;
        }
        80% {
          opacity: 0.1;
          border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
        }
        100% {
          transform: scale(15);
          opacity: 0;
          border-radius: 50%;
        }
      }
      
      .theme-ripple {
        position: fixed;
        background: var(--ripple-color);
        transform: scale(0);
        animation: water-ripple 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
        z-index: 9999;
        width: 100px;
        height: 100px;
        margin: -50px 0 0 -50px;
        filter: blur(8px);
        will-change: transform, opacity;
      }
      
      .theme-transition {
        transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Add a subtle wave effect to the body during theme change */
      @keyframes gentle-wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      
      body.theme-changing {
        animation: gentle-wave 1.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="theme-transition">
        {children}
        <AnimatePresence>
          {ripple && (
            <div
              key={ripple.id}
              className="theme-ripple"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                '--ripple-color': darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'
              }}
              onAnimationEnd={() => setRipple(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);