import { useEffect, useState } from 'react';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!siteConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          height: 80,
          padding: '0 6vw',
          backgroundColor: scrolled || menuOpen ? 'rgba(10, 10, 10, 0.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        }}
      >
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="text-[#C8AA82] no-underline hover:text-white transition-colors relative z-50"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          {siteConfig.brandName}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center" style={{ gap: 36 }}>
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="nav-link"
          >
            Contato
          </a>
        </div>

        {/* Desktop CTA */}
        {navigationConfig.ctaText && (
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="bg-transparent border border-[#C8AA82] text-[#C8AA82] hover:bg-[#C8AA82] hover:text-black px-6 py-2.5 uppercase tracking-wider text-xs font-semibold rounded-sm transition-all duration-300 hidden md:inline-block"
          >
            {navigationConfig.ctaText}
          </a>
        )}

        {/* Hamburger Toggle Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-[2px] bg-[#C8AA82] rounded-full transition-transform duration-300 ease-in-out ${
              menuOpen ? 'transform rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#C8AA82] rounded-full my-[4px] transition-opacity duration-300 ease-in-out ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#C8AA82] rounded-full transition-transform duration-300 ease-in-out ${
              menuOpen ? 'transform -rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown Overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 flex flex-col pt-24 pb-8 px-8 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{
          backgroundColor: '#0a0a0a',
          minHeight: '380px',
        }}
      >
        <div className="flex flex-col gap-6 items-center text-center">
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[#dadada] hover:text-white font-medium text-lg uppercase tracking-wider py-1 no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="text-[#dadada] hover:text-white font-medium text-lg uppercase tracking-wider py-1 no-underline"
          >
            Contato
          </a>

          {navigationConfig.ctaText && (
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="w-full bg-[#C8AA82] text-black text-center py-3.5 uppercase tracking-wider text-xs font-semibold rounded-sm mt-4 hover:bg-white transition-colors duration-300"
            >
              {navigationConfig.ctaText}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
