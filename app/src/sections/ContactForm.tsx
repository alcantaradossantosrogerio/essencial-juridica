import React, { useState } from 'react';
import { extraConfig, footerConfig } from '../config';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: 'Civil',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      // Clear form
      setFormData({ name: '', phone: '', area: 'Civil', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  const handleWhatsAppRedirect = () => {
    const text = `Olá! Meu nome é ${formData.name}. Gostaria de atendimento em Direito ${formData.area}. ${formData.message ? `Mensagem: ${formData.message}` : ''}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/556239213933?text=${encodedText}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative py-16 px-6 sm:px-12 md:py-28 md:px-20"
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Form */}
          <div className="flex-1">
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(36px, 4.5vw, 68px)',
                lineHeight: 1.1,
                letterSpacing: '-1px',
                color: '#ffffff',
                marginBottom: 40,
              }}
            >
              Agende uma Consulta
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-light">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="bg-neutral-950/40 border border-white/10 px-4 py-3 text-white rounded-sm focus:outline-none focus:border-[#C8AA82] transition-colors font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-light">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="bg-neutral-950/40 border border-white/10 px-4 py-3 text-white rounded-sm focus:outline-none focus:border-[#C8AA82] transition-colors font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-light">
                  Área de Interesse
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="bg-neutral-950 border border-white/10 px-4 py-3 text-white rounded-sm focus:outline-none focus:border-[#C8AA82] transition-colors font-light text-sm"
                >
                  <option value="Civil">Direito Civil</option>
                  <option value="Trabalhista">Direito Trabalhista</option>
                  <option value="Família">Direito de Família</option>
                  <option value="Empresarial">Direito Empresarial</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-light">
                  Mensagem (Opcional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explique brevemente seu caso..."
                  className="bg-neutral-950/40 border border-white/10 px-4 py-3 text-white rounded-sm focus:outline-none focus:border-[#C8AA82] transition-colors font-light text-sm resize-none"
                />
              </div>

              {submitted ? (
                <div className="bg-neutral-900 border border-[#C8AA82]/30 text-[#C8AA82] p-4 text-center rounded-sm text-sm">
                  ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-white text-black py-3 px-6 rounded-sm uppercase tracking-wider text-xs font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="flex-1 bg-[#25D366] text-white py-3 px-6 rounded-sm uppercase tracking-wider text-xs font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.745 1.45 5.436 0 9.86-4.426 9.864-9.864.002-2.635-1.023-5.11-2.884-6.974C16.512 1.899 14.04 .87 11.411.87 5.975.87 1.548 5.297 1.545 10.735c-.001 1.637.425 3.231 1.232 4.637l-.993 3.634 3.72-.976.143.084zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    Falar no WhatsApp
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Info & Location */}
          <div className="lg:w-[400px] flex flex-col gap-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#C8AA82] font-semibold mb-4">
                Informações de Contato
              </h3>
              {footerConfig.columns.map((column, colIndex) => (
                <div key={colIndex} className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">{column.title}</h4>
                  {column.links.map((link) => (
                    <p key={link} className="text-neutral-400 text-sm font-light leading-6 m-0">
                      {link}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#C8AA82] font-semibold mb-4">
                Contato Direto
              </h3>
              <p className="text-neutral-400 text-sm font-light leading-6 m-0">
                E-mail: contato@essencialjuridica.com.br
              </p>
              <p className="text-neutral-400 text-sm font-light leading-6 m-0 mt-1">
                WhatsApp: {extraConfig.whatsappNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
