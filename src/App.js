import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';

// Implement code splitting for main components
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;