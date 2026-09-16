import { useEffect, useState } from 'react';
import { heroConfig } from '../config';
import { usePrevidenciarioModal } from '../context/PrevidenciarioModalContext';

export default function Hero() {
  const { openModal } = usePrevidenciarioModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!heroConfig.title) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-start min-h-screen bg-[#060606] px-6 sm:px-12 md:px-20"
    >
      {/* Background Video (Logo Drawing Animation) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover object-center transition-transform duration-[10s] ease-out opacity-65 ${
            scrolled ? 'scale-105' : 'scale-100'
          }`}
          poster="/images/hero-bg.jpg"
        >
          <source src="/videos/Logo_drawing_animation_20260916134402.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Gradients to darken background and emphasize text */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(to right, rgba(6, 6, 6, 0.95) 0%, rgba(6, 6, 6, 0.80) 50%, rgba(6, 6, 6, 0.55) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'radial-gradient(circle at 30% 50%, transparent 0%, rgba(6, 6, 6, 0.75) 100%)'
        }}
      />

      <div className="relative z-20 max-w-4xl pt-36 sm:pt-40 md:pt-44 pb-16 text-left w-full">
        <h1
          className="text-white mb-6 leading-[1.1] tracking-tight text-left text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 400,
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          {heroConfig.title}
        </h1>

        {heroConfig.subtitleLine1 && (
          <p
            className="text-neutral-200 mb-3 font-light text-left leading-relaxed text-base sm:text-xl lg:text-2xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              maxWidth: 700,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {heroConfig.subtitleLine1}
          </p>
        )}

        {heroConfig.subtitleLine2 && (
          <p
            className="text-neutral-400 mb-10 font-light text-left leading-relaxed text-sm sm:text-base lg:text-lg"
            style={{
              fontFamily: "'Inter', sans-serif",
              maxWidth: 700,
            }}
          >
            {heroConfig.subtitleLine2}
          </p>
        )}

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#C8AA82] to-[#e4ccaa] text-black font-bold uppercase tracking-wider text-xs px-7 py-4 rounded-sm hover:from-white hover:to-white hover:scale-[1.03] transition-all duration-300 shadow-xl text-center w-full sm:w-auto sm:min-w-[220px] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Falar no WhatsApp (Com Triagem IA)</span>
          </button>
          <button
            onClick={() => document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[#C8AA82]/40 text-neutral-200 hover:border-[#C8AA82] hover:text-[#C8AA82] hover:bg-[#C8AA82]/5 font-semibold uppercase tracking-wider text-xs px-6 py-4 rounded-sm transition-all text-center w-full sm:w-auto sm:min-w-[180px] cursor-pointer"
          >
            Conhecer Atuação
          </button>
        </div>
      </div>
    </section>
  );
}
