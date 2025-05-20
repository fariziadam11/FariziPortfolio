import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('../components/Navbar'));
const Projects = lazy(() => import('../components/Projects'));
const Footer = lazy(() => import('../components/Footer'));

export default function ProjectsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
