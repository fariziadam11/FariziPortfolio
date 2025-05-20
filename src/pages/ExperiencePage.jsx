import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('../components/Navbar'));
const Experience = lazy(() => import('../components/Experience'));
const Footer = lazy(() => import('../components/Footer'));

export default function ExperiencePage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
