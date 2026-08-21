import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { methodConfig } from '../config';

export default function Method() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 50 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLDivElement);
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              delay: idx * 0.2,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  if (!methodConfig.title) {
    return null;
  }

  return (
    <section
      id="method"
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
              marginBottom: 20,
              maxWidth: 800,
            }}
          >
            {methodConfig.title}
          </h2>
          {methodConfig.subtitle && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: 18,
                color: '#dadada',
                opacity: 0.7,
                maxWidth: 600,
              }}
            >
              {methodConfig.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methodConfig.steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="p-8 border border-white/5 hover:border-white/15 bg-neutral-950/40 rounded-sm transition-all duration-300 flex flex-col justify-between"
              style={{ minHeight: 320 }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'GeistMono', monospace",
                    fontSize: 48,
                    fontWeight: 200,
                    color: '#C8AA82',
                    display: 'block',
                    opacity: 0.6,
                    marginBottom: 24,
                  }}
                >
                  {step.number}
                </span>
                <h3
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 26,
                    fontWeight: 400,
                    color: '#ffffff',
                    marginBottom: 16,
                  }}
                >
                  {step.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: '#dadada',
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
