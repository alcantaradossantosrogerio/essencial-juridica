import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { capabilitiesConfig } from '../config';

export default function Curriculum() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const observers: IntersectionObserver[] = [];

    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 40 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: (index % 2) * 0.15,
                ease: 'power3.out',
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(item);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  if (!capabilitiesConfig.sectionLabel && capabilitiesConfig.items.length === 0) {
    return null;
  }

  return (
    <section
      id="curriculum"
      ref={sectionRef}
      className="relative py-16 px-6 sm:px-12 md:py-28 md:px-20"
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="mb-20">
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(36px, 4.5vw, 68px)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            Domínio Técnico em Cada Caso
          </h2>
          <p
            className="text-neutral-400 font-light text-left leading-relaxed max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
            }}
          >
            Prestamos atendimento especializado focado na resolução estratégica e proteção de direitos e ativos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilitiesConfig.items.map((discipline, i) => (
            <div
              key={discipline.title}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="group cursor-pointer relative overflow-hidden bg-neutral-950/30 border border-white/5 hover:border-[#C8AA82]/30 p-8 md:p-10 rounded-sm transition-all duration-300 flex flex-col justify-between"
              style={{ minHeight: 380 }}
              onClick={() => navigate(`/capability/${discipline.slug}`)}
            >
              {/* Card Image Overlay Background on Hover */}
              {discipline.image && (
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 opacity-0 group-hover:opacity-10 scale-105 group-hover:scale-100 filter grayscale"
                  style={{ backgroundImage: `url(${discipline.image})` }}
                />
              )}

              <div className="relative z-10">
                <span className="text-[#C8AA82] text-xs uppercase tracking-widest font-semibold block mb-4">
                  0{i + 1} // Área de Atuação
                </span>
                <h3
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 3.2vw, 42px)',
                    lineHeight: 1.15,
                    color: '#ffffff',
                    marginBottom: 20,
                    transition: 'color 0.3s ease',
                  }}
                  className="group-hover:text-[#C8AA82]"
                >
                  {discipline.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200,
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: '#dadada',
                    margin: 0,
                    opacity: 0.8,
                  }}
                >
                  {discipline.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8AA82] mt-8 group-hover:text-white transition-colors duration-300">
                <span>Saiba Mais</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
