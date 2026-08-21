import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { testimonialsConfig } from '../config';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    items.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 40 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLDivElement);
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              delay: idx * 0.15,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  if (!testimonialsConfig.title) {
    return null;
  }

  return (
    <section
      id="testimonials"
      ref={containerRef}
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
              margin: 0,
            }}
          >
            {testimonialsConfig.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsConfig.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="p-8 border border-white/5 bg-neutral-950/20 rounded-sm relative"
            >
              {/* Quote Mark */}
              <span
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 72,
                  color: '#C8AA82',
                  position: 'absolute',
                  top: 10,
                  left: 20,
                  opacity: 0.15,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                “
              </span>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontStyle: 'italic',
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#dadada',
                  marginBottom: 32,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {item.quote}
              </p>

              <div>
                <span
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 18,
                    color: '#ffffff',
                    display: 'block',
                    fontWeight: 400,
                  }}
                >
                  {item.author}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 200,
                    color: '#C8AA82',
                    opacity: 0.8,
                    display: 'block',
                    marginTop: 4,
                  }}
                >
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
