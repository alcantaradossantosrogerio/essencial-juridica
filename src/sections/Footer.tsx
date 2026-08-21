import { footerConfig, extraConfig } from '../config';

export default function Footer() {
  if (!footerConfig.heading && footerConfig.columns.length === 0) {
    return null;
  }

  return (
    <footer
      id="footer"
      className="relative py-16 px-6 sm:px-12 md:py-24 md:px-20"
      style={{
        background: '#060606',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Help/Consultation CTA Banner */}
        <div 
          className="mb-24 p-8 md:p-14 border border-[#C8AA82]/20 bg-neutral-950/40 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-[#C8AA82] text-xs uppercase tracking-widest font-semibold block mb-3">
              Consulta Jurídica
            </span>
            <h3 
              className="text-white text-3xl md:text-4xl font-normal leading-tight mb-4"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Fale Diretamente Conosco no WhatsApp
            </h3>
            <p className="text-neutral-400 text-sm md:text-base font-light m-0">
              Estamos prontos para analisar o seu caso e fornecer a melhor orientação estratégica. Clique ao lado e fale com nossa equipe.
            </p>
          </div>
          <a
            href={extraConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C8AA82] text-black font-semibold uppercase tracking-wider text-xs px-8 py-3.5 rounded-sm hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-lg text-center w-full md:w-auto md:min-w-[180px]"
          >
            Iniciar Conversa
          </a>
        </div>

        {footerConfig.heading && (
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(40px, 5vw, 80px)',
              lineHeight: 1.1,
              letterSpacing: '-1.44px',
              color: '#ffffff',
              marginBottom: 80,
            }}
          >
            {footerConfig.heading}
          </h2>
        )}

        {footerConfig.columns.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 60, marginBottom: 120 }}
          >
            {footerConfig.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col" style={{ gap: 16 }}>
                {column.title && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: '#dadada',
                      opacity: 0.4,
                      marginBottom: 8,
                    }}
                  >
                    {column.title}
                  </span>
                )}
                {column.links.map((link) => (
                  <span
                    key={link}
                    className="text-neutral-300 font-light text-sm leading-6"
                  >
                    {link}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            gap: 16,
          }}
        >
          {footerConfig.copyright && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: 12,
                color: '#dadada',
                opacity: 0.4,
              }}
            >
              {footerConfig.copyright}
            </span>
          )}
          {footerConfig.bottomLinks.length > 0 && (
            <div className="flex items-center" style={{ gap: 24 }}>
              {footerConfig.bottomLinks.map((bottomLink) => (
                <a
                  key={bottomLink.label}
                  href={bottomLink.href || '#'}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200,
                    fontSize: 12,
                    color: '#dadada',
                    opacity: 0.4,
                    textDecoration: 'none',
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.4'; }}
                >
                  {bottomLink.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
