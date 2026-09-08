import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { architectureConfig } from '../config';

export default function CinematicVision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    gsap.set(text, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!architectureConfig.sectionLabel && !architectureConfig.title) {
    return null;
  }

  return (
    <section
      id="cinematic"
      ref={sectionRef}
      className="relative py-16 px-6 sm:px-12 md:py-28 md:px-20"
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="relative">
          {architectureConfig.videoPath && (
            <div
              className="relative overflow-hidden w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9]"
            >
              <video
                ref={videoRef}
                src={architectureConfig.videoPath}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>
          )}

          <div
            ref={textRef}
            className="flex flex-col md:flex-row md:items-center mt-10 md:mt-24 gap-8 md:gap-16"
          >
            {architectureConfig.title && (
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(28px, 4vw, 54px)',
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  color: '#ffffff',
                  margin: 0,
                  flex: '0 0 50%',
                  textWrap: 'balance',
                }}
              >
                {architectureConfig.title}
              </h2>
            )}
            {architectureConfig.description && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: '#dadada',
                  margin: 0,
                  flex: '1 1 50%',
                  textWrap: 'pretty',
                }}
              >
                {architectureConfig.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
