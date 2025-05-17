import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgressBar from './components/ScrollProgressBar';
import ErrorFallback from './components/ErrorFallback';

// Enhanced code splitting with prefetching and loading priorities
const Navbar = lazy(() => import(/* webpackPrefetch: true */ './components/Navbar'));
const Hero = lazy(() => import(/* webpackPrefetch: true */ './components/Hero'));

// Lower priority components loaded with delay
const About = lazy(() => {
  // Small delay for non-critical components
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/About')), 100);
  });
});

const Experience = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Experience')), 200);
  });
});

const Projects = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Projects')), 300);
  });
});

const Skills = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Skills')), 400);
  });
});

const Contact = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Contact')), 500);
  });
});

const Footer = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Footer')), 600);
  });
});

function App() {
  // Track visible sections for better performance
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    about: false,
    experience: false,
    projects: false,
    skills: false,
    contact: false
  });

  // Intersection Observer setup to load components as they come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '200px', // Load slightly before scrolling into view
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (id && visibleSections.hasOwnProperty(id)) {
          setVisibleSections(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
          <ScrollProgressBar />
          
          {/* Critical UI components loaded immediately */}
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
          </Suspense>
          
          <main>
            {/* Hero section always loaded */}
            <Suspense fallback={<LoadingSpinner />}>
              <Hero />
            </Suspense>
            
            {/* Other sections loaded conditionally with individual suspense boundaries */}
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <About />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <Experience />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <Projects />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <Skills />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <Contact />
            </Suspense>
          </main>
          
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;