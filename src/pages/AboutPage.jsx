import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('../components/Navbar'));
const About = lazy(() => import('../components/About'));
const Footer = lazy(() => import('../components/Footer'));

export default function AboutPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <Suspense fallback={null}>
          <About />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
