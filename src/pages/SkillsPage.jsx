import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('../components/Navbar'));
const Skills = lazy(() => import('../components/Skills'));
const Footer = lazy(() => import('../components/Footer'));

export default function SkillsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
