import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Menu, X } from 'lucide-react';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
        return;
      }

      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId) || document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for sections not having identical id
        if (targetId === 'hero' || targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetId === 'contact' || targetId === 'contato') {
          const contactEl = document.getElementById('contact');
          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const contact = siteConfig.headerContact;
  const socials = siteConfig.socials;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* ============================================================ */}
      {/* 1. Top Bar / Info & Social Networks                          */}
      {/* ============================================================ */}
      <div
        className={`transition-all duration-300 border-b border-white/5 ${
          scrolled ? 'hidden md:block py-1.5 opacity-90' : 'py-2.5 opacity-100'
        }`}
        style={{
          background: 'linear-gradient(90deg, rgba(8, 8, 8, 0.98) 0%, rgba(14, 14, 14, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Contact Details (Left) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-neutral-300">
            {contact?.phone && (
              <a
                href={contact.phoneHref || `tel:${contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-[#C8AA82] transition-colors duration-200 group no-underline"
              >
                <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#C8AA82]/20 flex items-center justify-center transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8AA82]" />
                </span>
                <span className="font-light tracking-wide">{contact.phone}</span>
              </a>
            )}

            {contact?.email && (
              <a
                href={contact.emailHref || `mailto:${contact.email}`}
                className="hidden sm:flex items-center gap-2 text-neutral-300 hover:text-[#C8AA82] transition-colors duration-200 group no-underline"
              >
                <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#C8AA82]/20 flex items-center justify-center transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#C8AA82]" />
                </span>
                <span className="font-light tracking-wide">{contact.email}</span>
              </a>
            )}

            {contact?.address && (
              <a
                href={contact.addressHref || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 text-neutral-400 hover:text-[#C8AA82] transition-colors duration-200 group no-underline"
              >
                <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#C8AA82]/20 flex items-center justify-center transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#C8AA82]" />
                </span>
                <span className="font-light tracking-wide">{contact.address}</span>
              </a>
            )}
          </div>

          {/* Social Media Links (Right) */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#C8AA82]/60 hover:bg-[#C8AA82]/10 text-neutral-300 hover:text-[#C8AA82] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}

            {socials?.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#C8AA82]/60 hover:bg-[#C8AA82]/10 text-neutral-300 hover:text-[#C8AA82] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            )}

            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#C8AA82]/60 hover:bg-[#C8AA82]/10 text-neutral-300 hover:text-[#C8AA82] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}

            {socials?.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#C8AA82]/60 hover:bg-[#C8AA82]/10 text-neutral-300 hover:text-[#C8AA82] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Main Navigation Bar (Logo & Menu)                        */}
      {/* ============================================================ */}
      <nav
        className="transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(8, 8, 8, 0.95)' : 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(200, 170, 130, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-20 sm:h-24 flex items-center justify-between gap-6">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 no-underline group focus:outline-none"
          >
            {siteConfig.logoUrl && !imgError ? (
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.brandName}
                onError={() => setImgError(true)}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: 'brightness(1.1) drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.5))',
                }}
              />
            ) : (
              <span
                className="text-[#C8AA82] group-hover:text-white transition-colors tracking-wide"
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 'clamp(20px, 2.5vw, 24px)',
                  fontWeight: 500,
                  letterSpacing: '0.8px',
                }}
              >
                {siteConfig.brandName}
              </span>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigationConfig.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link font-normal text-[13px] tracking-[0.5px] uppercase text-neutral-300 hover:text-white py-1 relative after:transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {navigationConfig.ctaText && (
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="inline-flex items-center justify-center border border-[#C8AA82] text-[#C8AA82] hover:bg-[#C8AA82] hover:text-black px-5 py-2.5 uppercase tracking-wider text-xs font-semibold rounded-sm transition-all duration-300 shadow-[0_0_15px_rgba(200,170,130,0.1)] hover:shadow-[0_0_20px_rgba(200,170,130,0.3)] hover:scale-[1.02]"
              >
                {navigationConfig.ctaText}
              </a>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md bg-white/5 border border-white/10 text-neutral-200 hover:text-[#C8AA82] hover:border-[#C8AA82]/40 transition-colors focus:outline-none"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X className="w-6 h-6 text-[#C8AA82]" /> : <Menu className="w-6 h-6 text-[#C8AA82]" />}
          </button>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 3. Mobile Menu Overlay                                      */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-x-0 top-[116px] sm:top-[128px] bottom-0 z-40 bg-[#080808]/98 backdrop-blur-2xl border-t border-white/10 transition-all duration-300 lg:hidden overflow-y-auto ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 sm:p-8 space-y-6 max-w-md mx-auto">
          {/* Navigation Links List */}
          <div className="flex flex-col space-y-3 pb-6 border-b border-white/10">
            {navigationConfig.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-neutral-200 hover:text-[#C8AA82] text-base font-light tracking-wider uppercase py-2 transition-colors duration-200 no-underline flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-neutral-600 text-xs">→</span>
              </a>
            ))}
          </div>

          {/* Contact Details in Mobile Menu */}
          <div className="flex flex-col space-y-3 py-2 text-sm text-neutral-300">
            {contact?.phone && (
              <a
                href={contact.phoneHref || `tel:${contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-[#C8AA82] transition-colors py-1"
              >
                <Phone className="w-4 h-4 text-[#C8AA82]" />
                <span>{contact.phone}</span>
              </a>
            )}

            {contact?.email && (
              <a
                href={contact.emailHref || `mailto:${contact.email}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-[#C8AA82] transition-colors py-1"
              >
                <Mail className="w-4 h-4 text-[#C8AA82]" />
                <span className="break-all">{contact.email}</span>
              </a>
            )}

            {contact?.address && (
              <a
                href={contact.addressHref || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-400 hover:text-[#C8AA82] transition-colors py-1"
              >
                <MapPin className="w-4 h-4 text-[#C8AA82]" />
                <span>{contact.address}</span>
              </a>
            )}
          </div>

          {/* Social Icons in Mobile Menu */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-[#C8AA82] hover:border-[#C8AA82] flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socials?.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-[#C8AA82] hover:border-[#C8AA82] flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-[#C8AA82] hover:border-[#C8AA82] flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socials?.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-[#C8AA82] hover:border-[#C8AA82] flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Mobile CTA */}
          {navigationConfig.ctaText && (
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full bg-[#C8AA82] hover:bg-white text-black font-semibold text-xs uppercase tracking-wider py-3.5 rounded-sm text-center transition-colors duration-300 shadow-md mt-4"
            >
              {navigationConfig.ctaText}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
