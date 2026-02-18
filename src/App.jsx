import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';

export default function App() {
  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // 초기 요소 관찰
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // 동적으로 추가되는 .reveal 요소도 관찰
    const mutation = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList?.contains('reveal')) observer.observe(node);
            node.querySelectorAll?.('.reveal').forEach((el) => observer.observe(el));
          }
        });
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Guestbook />
      <Footer />
    </div>
  );
}
